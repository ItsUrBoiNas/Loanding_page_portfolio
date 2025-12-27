import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { sendEmail, getEmailSettings } from '@/lib/email'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com'

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token')
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const body = await request.json()

    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      )
    }

    const accessToken = await getPayPalAccessToken()

    // Capture PayPal order
    const captureResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!captureResponse.ok) {
      throw new Error('Failed to capture PayPal order')
    }

    const captureData = await captureResponse.json()

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment not completed', status: captureData.status },
        { status: 400 }
      )
    }

    // Find order by PayPal order ID
    const orders = await payload.find({
      collection: 'orders',
      where: {
        paypalOrderId: {
          equals: orderId,
        },
      },
      limit: 1,
    })

    if (orders.docs.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const order = orders.docs[0]

    // Update order status
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        status: 'paid',
        paymentId: captureData.id,
      },
    })

    // Get lead form
    const leadForm = await payload.findByID({
      collection: 'lead-forms',
      id: typeof order.leadForm === 'object' ? order.leadForm.id : order.leadForm,
    })

    // Find or create client
    let client
    const existingClients = await payload.find({
      collection: 'clients',
      where: {
        email: {
          equals: leadForm.email,
        },
      },
      limit: 1,
    })

    if (existingClients.docs.length > 0) {
      client = existingClients.docs[0].id
      // Update client info if needed
      await payload.update({
        collection: 'clients',
        id: client,
        data: {
          name: leadForm.name,
          phone: leadForm.phone,
          company: leadForm.company || '',
          website: leadForm.website || '',
          location: leadForm.location || '',
        },
      })
    } else {
      const newClient = await payload.create({
        collection: 'clients',
        data: {
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          company: leadForm.company || '',
          website: leadForm.website || '',
          location: leadForm.location || '',
        },
      })
      client = newClient.id
    }

    // Link client to order
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        client,
      },
    })

    // Update lead form status
    await payload.update({
      collection: 'lead-forms',
      id: leadForm.id,
      data: {
        status: 'in-progress',
      },
    })

    // Get email settings
    const settings = await payload.findGlobal({
      slug: 'settings',
    })

    // Send confirmation email
    const emailHtml = `
      <h2>Payment Confirmed!</h2>
      <p>Thank you for your purchase, ${leadForm.name}!</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Amount:</strong> $${order.amount}</p>
      <p>Your single-page landing page will be delivered within 2 business days.</p>
      <p>We'll be in touch soon with updates on your project.</p>
    `

    await sendEmail(
      {
        to: leadForm.email,
        subject: `Order Confirmed - ${order.orderNumber}`,
        html: emailHtml,
        from: settings?.defaultFromEmail || process.env.DEFAULT_FROM_EMAIL,
        fromName: settings?.defaultFromName || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio',
      },
      settings?.useCloudflareEmail || false,
      settings?.cloudflareEmailConfig,
      settings?.resendApiKey || process.env.RESEND_API_KEY
    )

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    })
  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to capture payment' },
      { status: 500 }
    )
  }
}











