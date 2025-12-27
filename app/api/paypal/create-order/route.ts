import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

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

    const { amount, formData } = body

    if (!amount || !formData) {
      return NextResponse.json(
        { error: 'Amount and formData are required' },
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

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
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
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/payment/cancel`,
        },
      }),
    })

    if (!orderResponse.ok) {
      throw new Error('Failed to create PayPal order')
    }

    const orderData = await orderResponse.json()

    // Find approval URL
    const approvalUrl = orderData.links?.find((link: any) => link.rel === 'approve')?.href

    if (!approvalUrl) {
      throw new Error('No approval URL found in PayPal response')
    }

    // Save lead form with pending payment
    const leadForm = await payload.create({
      collection: 'lead-forms',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        website: formData.website || '',
        location: formData.location || '',
        needs: formData.needs,
        references: formData.references || [],
        formType: 'purchase',
        status: 'new',
      },
    })

    // Create order record
    const order = await payload.create({
      collection: 'orders',
      data: {
        client: null, // Will be linked after payment
        type: 'purchase',
        amount: amount,
        status: 'pending',
        paypalOrderId: orderData.id,
        leadForm: leadForm.id,
      },
    })

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      approvalUrl,
      orderNumber: order.orderNumber,
    })
  } catch (error) {
    console.error('PayPal create order error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}











