import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ message: 'Lead form API is active' })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, website, location, needs, details, budget, timeline, references, formType } = body

    // Support both 'needs' (purchase form) and 'details' (quote form)
    const projectDescription = needs || details

    if (!name || !email || !phone || !projectDescription || !formType) {
      return NextResponse.json(
        { error: 'Name, email, phone, project description, and formType are required' },
        { status: 400 }
      )
    }

    // Build email HTML
    const emailHtml = `
      <h2>New ${formType === 'quote' ? 'Quote Request' : 'Purchase Request'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
      ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
      <p><strong>${formType === 'quote' ? 'Project Details' : 'Needs'}:</strong></p>
      <p>${projectDescription}</p>
      ${references && references.length > 0 ? `<p><strong>Uploaded Files:</strong> ${references.length} file(s)</p>` : ''}
      ${formType === 'quote' ? '<p><em>This is a quote request for a multi-page site.</em></p>' : '<p><em>This is a purchase request for a single-page landing page ($199).</em></p>'}
    `

    // Send notification email to all admin emails
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim())
      : [process.env.DEFAULT_FROM_EMAIL || 'admin@example.com']
    const emailResult = await sendEmail({
      to: adminEmails,
      subject: `New ${formType === 'quote' ? 'Quote Request' : 'Purchase Request'} from ${name}`,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      // Still return success - we received the submission
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead form', details: String(error) },
      { status: 500 }
    )
  }
}

