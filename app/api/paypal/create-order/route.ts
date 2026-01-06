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

  console.log('[PayPal] Requesting access token from:', baseUrl)

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[PayPal] Access token error:', response.status, errorText)
    throw new Error(`Failed to get PayPal access token: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  console.log('[PayPal] Access token obtained successfully')
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, formData } = body

    if (!amount || !formData) {
      return NextResponse.json(
        { error: 'Amount and formData are required' },
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Create PayPal order
    // Note: custom_id has a 127-character limit, so we only store the email for lookup
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount.toString(),
            },
            description: 'Single Page Landing Page - 2 Day Turn-around',
            custom_id: formData.email.substring(0, 127), // PayPal limit: 127 chars
          },
        ],
        application_context: {
          return_url: `${siteUrl}/payment/success`,
          cancel_url: `${siteUrl}/payment/cancel`,
        },
      }),
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()
      console.error('[PayPal] Order creation failed:', JSON.stringify(errorData, null, 2))
      const errorMessage = errorData.details?.[0]?.description || errorData.message || 'Failed to create PayPal order'
      throw new Error(errorMessage)
    }

    const orderData = await orderResponse.json()

    // Find approval URL
    const approvalUrl = orderData.links?.find((link: any) => link.rel === 'approve')?.href

    if (!approvalUrl) {
      throw new Error('No approval URL found in PayPal response')
    }

    // Generate order number
    const orderNumber = `LP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // Send notification email to admin about new pending order
    const adminEmail = process.env.ADMIN_EMAIL || process.env.DEFAULT_FROM_EMAIL || 'admin@example.com'
    await sendEmail({
      to: adminEmail,
      subject: `New Purchase Request - ${orderNumber}`,
      html: `
        <h2>New Purchase Request (Pending Payment)</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>PayPal Order ID:</strong> ${orderData.id}</p>
        <hr>
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
        ${formData.website ? `<p><strong>Website:</strong> ${formData.website}</p>` : ''}
        ${formData.location ? `<p><strong>Location:</strong> ${formData.location}</p>` : ''}
        <p><strong>Needs:</strong></p>
        <p>${formData.needs}</p>
      `,
    })

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      approvalUrl,
      orderNumber,
    })
  } catch (error) {
    console.error('PayPal create order error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}

