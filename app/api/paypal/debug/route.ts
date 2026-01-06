import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Temporary debug endpoint - DELETE after fixing PayPal issue
export async function GET() {
    const mode = process.env.PAYPAL_MODE
    const hasClientId = !!process.env.PAYPAL_CLIENT_ID
    const hasClientSecret = !!process.env.PAYPAL_CLIENT_SECRET
    const clientIdPreview = process.env.PAYPAL_CLIENT_ID?.substring(0, 10) + '...'

    const baseUrl = mode === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'

    // Test the credentials
    let credentialsValid = false
    let errorMessage = ''

    if (hasClientId && hasClientSecret) {
        try {
            const auth = Buffer.from(
                `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
            ).toString('base64')

            const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials',
            })

            if (response.ok) {
                credentialsValid = true
            } else {
                const errorData = await response.text()
                errorMessage = `PayPal API returned ${response.status}: ${errorData}`
            }
        } catch (e) {
            errorMessage = e instanceof Error ? e.message : 'Unknown error'
        }
    }

    return NextResponse.json({
        paypalMode: mode || 'NOT SET',
        usingUrl: baseUrl,
        hasClientId,
        hasClientSecret,
        clientIdPreview: hasClientId ? clientIdPreview : 'NOT SET',
        credentialsValid,
        errorMessage: errorMessage || undefined,
        timestamp: new Date().toISOString(),
    })
}
