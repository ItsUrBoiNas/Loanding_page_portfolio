import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { sendEmail, getEmailSettings } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const body = await request.json()

    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Save to Payload CMS
    const submission = await payload.create({
      collection: 'contact-form-submissions',
      data: {
        name,
        email,
        phone: phone || '',
        message,
        status: 'new',
      },
    })

    // Get email settings
    const settings = await payload.findGlobal({
      slug: 'settings',
    })

    const emailSettings = await getEmailSettings()
    
    // Send notification email
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    await sendEmail(
      {
        to: settings?.defaultFromEmail || process.env.DEFAULT_FROM_EMAIL || 'admin@example.com',
        subject: `New Contact Form Submission from ${name}`,
        html: emailHtml,
        from: settings?.defaultFromEmail || process.env.DEFAULT_FROM_EMAIL,
        fromName: settings?.defaultFromName || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio',
      },
      settings?.useCloudflareEmail || false,
      settings?.cloudflareEmailConfig,
      settings?.resendApiKey || process.env.RESEND_API_KEY
    )

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}











