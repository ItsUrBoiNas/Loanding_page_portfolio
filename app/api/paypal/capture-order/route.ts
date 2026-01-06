import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getPayPalConfig() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const mode = process.env.PAYPAL_MODE
  const baseUrl = mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

  console.log('[PayPal Config] Mode:', mode, '| Using URL:', baseUrl)

  return { clientId, clientSecret, baseUrl }
}

async function getPayPalAccessToken(clientId: string, clientSecret: string, baseUrl: string): Promise<string> {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
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
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const { clientId, clientSecret, baseUrl } = getPayPalConfig()

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      )
    }

    const accessToken = await getPayPalAccessToken(clientId, clientSecret, baseUrl)

    // Get order details first to retrieve customer data
    const orderDetailsResponse = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!orderDetailsResponse.ok) {
      throw new Error('Failed to get PayPal order details')
    }

    const orderDetails = await orderDetailsResponse.json()

    // Capture PayPal order
    const captureResponse = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
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

    // Extract customer email from custom_id and payer info from PayPal
    const customerEmail = orderDetails.purchase_units?.[0]?.custom_id || captureData.payer?.email_address || ''
    const customerName = captureData.payer?.name?.given_name
      ? `${captureData.payer.name.given_name} ${captureData.payer.name.surname || ''}`
      : 'Customer'

    const amount = orderDetails.purchase_units?.[0]?.amount?.value || '199'
    const orderNumber = `LP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const paymentId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id || captureData.id

    // Send confirmation email to customer
    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: `Order Confirmed - ${orderNumber}`,
        html: `
          <h2>Payment Confirmed!</h2>
          <p>Thank you for your purchase, ${customerName}!</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <hr>
          <p>Your single-page landing page will be delivered within 2 business days.</p>
          <p>We'll be in touch soon with updates on your project.</p>
        `,
      })
    }

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.DEFAULT_FROM_EMAIL || 'admin@example.com'
    await sendEmail({
      to: adminEmail,
      subject: `Payment Received - ${orderNumber}`,
      html: `
        <h2>Payment Completed!</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>PayPal Order ID:</strong> ${orderId}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <hr>
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>PayPal Payer ID:</strong> ${captureData.payer?.payer_id || 'N/A'}</p>
        <p><em>Full customer details were sent in the initial order notification email.</em></p>
      `,
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      paymentId,
    })
  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to capture payment' },
      { status: 500 }
    )
  }
}

