import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Build email HTML
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `

    // Send notification email to all admin emails
    const defaultEmails = 'nasir.henken@Outlook.com,henkenssnasir@gmail.com,hnas62200@gmail.com'
    const envEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || defaultEmails;
    const adminEmails = envEmails.split(',').map((e) => e.trim())
    const emailResult = await sendEmail({
      to: adminEmails,
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form', details: String(error) },
      { status: 500 }
    )
  }
}

