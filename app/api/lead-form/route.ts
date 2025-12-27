import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { sendEmail, getEmailSettings } from '@/lib/email'

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
  console.log('API: lead-form POST request started')
  try {
    console.log('API: loading payload config...')
    const payload = await getPayloadHMR({ config: configPromise })
    console.log('API: payload loaded, parsing body...')
    const body = await request.json()
    console.log('API: body parsed', body)

    const { name, email, phone, company, website, location, needs, references, formType } = body

    if (!name || !email || !phone || !needs || !formType) {
      console.log('API: validation failed')
      return NextResponse.json(
        { error: 'Name, email, phone, needs, and formType are required' },
        { status: 400 }
      )
    }

    // Find or create client
    let client
    const existingClients = await payload.find({
      collection: 'clients',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    if (existingClients.docs.length > 0) {
      client = existingClients.docs[0].id
    } else {
      const newClient = await payload.create({
        collection: 'clients',
        data: {
          name,
          email,
          phone,
          company: company || '',
          website: website || '',
          location: location || '',
        },
      })
      client = newClient.id
    }

    // Save lead form
    const leadForm = await payload.create({
      collection: 'lead-forms',
      data: {
        name,
        email,
        phone,
        company: company || '',
        website: website || '',
        location: location || '',
        needs,
        references: references || [],
        formType,
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
      <h2>New ${formType === 'quote' ? 'Quote Request' : 'Purchase Request'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      <p><strong>Needs:</strong></p>
      <p>${needs}</p>
      ${formType === 'quote' ? '<p><em>This is a quote request for a multi-page site.</em></p>' : '<p><em>This is a purchase request for a single-page landing page ($199).</em></p>'}
    `

    await sendEmail(
      {
        to: settings?.defaultFromEmail || process.env.DEFAULT_FROM_EMAIL || 'admin@example.com',
        subject: `New ${formType === 'quote' ? 'Quote Request' : 'Purchase Request'} from ${name}`,
        html: emailHtml,
        from: settings?.defaultFromEmail || process.env.DEFAULT_FROM_EMAIL,
        fromName: settings?.defaultFromName || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio',
      },
      settings?.useCloudflareEmail || false,
      settings?.cloudflareEmailConfig,
      settings?.resendApiKey || process.env.RESEND_API_KEY
    )

    return NextResponse.json(
      { success: true, id: leadForm.id, clientId: client },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead form' },
      { status: 500 }
    )
  }
}











