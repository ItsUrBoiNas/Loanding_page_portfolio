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
    const { 
      name, email, phone, company, website, 
      budget, timeline, formType,
      offer, traffic, cvr, roadblock, competitors, // Quote specific
      target, mission, audience, // Purchase specific
      isPartial // Ghost capture flag
    } = body

    if (isPartial) {
      if (!email) {
        return NextResponse.json({ error: 'Email is required for partial capture' }, { status: 400 })
      }
    } else {
      if (!name || !email || !phone || !formType) {
        return NextResponse.json(
          { error: 'Name, email, phone, and formType are required' },
          { status: 400 }
        )
      }
    }

    // Build email HTML
    let emailHtml = `
      <h2 style="font-family: sans-serif; color: #111;">
        ${isPartial ? '🚨 PARTIAL LEAD CAPTURED' : `New ${formType === 'quote' ? 'Arsenal Quote Request' : 'Blueprint Purchase Request'}`}
      </h2>
      <hr />
      <h3>Client Details:</h3>
      ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
      <br/>`

    if (!isPartial) {
      if (formType === 'quote') {
        emailHtml += `
        <h3>Project Intel ($799 - $2,500 Tier Framework):</h3>
        <p><strong>Primary Offer:</strong> ${offer || 'N/A'}</p>
        <p><strong>Current Traffic & Source:</strong> ${traffic || 'N/A'}</p>
        <p><strong>Current CVR:</strong> ${cvr || 'N/A'}</p>
        <p><strong>Biggest Roadblock:</strong> ${roadblock || 'N/A'}</p>
        <p><strong>Competitor Kill List:</strong> ${competitors || 'N/A'}</p>
        <p><strong>Budget Range:</strong> ${budget || 'N/A'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
        `
      } else {
        emailHtml += `
        <h3>Purchase Intel ($199 Tier Framework):</h3>
        <p><strong>The Target (Offer/Service):</strong> ${target || 'N/A'}</p>
        <p><strong>The Mission (Primary CTA):</strong> ${mission || 'N/A'}</p>
        <p><strong>The Audience (Who is buying):</strong> ${audience || 'N/A'}</p>
        `
      }
    }

    // Send notification email to all admin emails
    const defaultEmails = 'nasir.henken@Outlook.com,henkenssnasir@gmail.com,hnas62200@gmail.com'
    const envEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || defaultEmails;
    const adminEmails = envEmails.split(',').map((e) => e.trim())
      
    const emailSubject = isPartial 
      ? `[NASLOGIC] 🚨 PARTIAL LEAD: ${email}` 
      : `[NASLOGIC] New ${formType === 'quote' ? 'Quote Lead' : 'Purchase Intel'} from ${name}`

    const emailResult = await sendEmail({
      to: adminEmails,
      subject: emailSubject,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json(
        { error: 'Email failed: ' + JSON.stringify(emailResult.error) },
        { status: 500 }
      )
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
