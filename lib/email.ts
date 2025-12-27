import { Resend } from 'resend'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
  fromName?: string
}

interface CloudflareEmailConfig {
  apiToken: string
  fromEmail: string
  fromName: string
}

let resendClient: Resend | null = null

export async function sendEmail(
  options: EmailOptions,
  useCloudflareEmail: boolean = false,
  cloudflareConfig?: CloudflareEmailConfig,
  resendApiKey?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (useCloudflareEmail && cloudflareConfig) {
      return await sendCloudflareEmail(options, cloudflareConfig)
    } else {
      return await sendResendEmail(options, resendApiKey)
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function sendResendEmail(
  options: EmailOptions,
  apiKey?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resendClient) {
      const key = apiKey || process.env.RESEND_API_KEY
      if (!key) {
        throw new Error('Resend API key is not configured')
      }
      resendClient = new Resend(key)
    }

    const from = options.from || process.env.DEFAULT_FROM_EMAIL || 'onboarding@resend.dev'
    const fromName = options.fromName || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio'

    const { error } = await resendClient.emails.send({
      from: `${fromName} <${from}>`,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

async function sendCloudflareEmail(
  options: EmailOptions,
  config: CloudflareEmailConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    // Cloudflare Email Workers API
    // Note: This requires a Cloudflare Worker configured for email handling
    // The actual implementation depends on your Cloudflare Email setup
    
    const response = await fetch('https://api.cloudflare.com/client/v4/accounts/{account_id}/email/routing/rules', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions: [
          {
            type: 'forward',
            value: [options.to],
          },
        ],
        matchers: [
          {
            type: 'literal',
            field: 'to',
            value: config.fromEmail,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.message || 'Cloudflare API error' }
    }

    // For actual email sending via Cloudflare, you would typically use a Worker
    // This is a placeholder - you'll need to implement based on your Cloudflare Email setup
    // Alternative: Use Cloudflare Email Routing with a Worker that sends emails
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send Cloudflare email',
    }
  }
}

export async function getEmailSettings() {
  // This will be called from API routes to get settings from Payload
  // For now, return defaults
  return {
    useCloudflareEmail: process.env.USE_CLOUDFLARE_EMAIL === 'true',
    cloudflareConfig: {
      apiToken: process.env.CLOUDFLARE_EMAIL_API_TOKEN,
      fromEmail: process.env.CLOUDFLARE_FROM_EMAIL || process.env.DEFAULT_FROM_EMAIL,
      fromName: process.env.CLOUDFLARE_FROM_NAME || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio',
    },
    resendApiKey: process.env.RESEND_API_KEY,
  }
}











