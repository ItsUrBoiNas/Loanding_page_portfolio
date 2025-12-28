import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { sendEmail, getEmailSettings } from '@/lib/email'

// Force Node.js runtime for database access
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
  console.log('API: lead-form POST request started')

  // Initialize payload first with explicit error handling
  let payload
  try {
    console.log('API: initializing payload client...')
    payload = await getPayloadClient()
    console.log('API: payload client initialized successfully')
  } catch (initError) {
    console.error('API: Failed to initialize Payload:', initError)
    return NextResponse.json(
      { error: 'Database connection failed. Please try again later.', details: String(initError) },
      { status: 503 }
    )
  }

  // Parse request body with error handling
  let body
  try {
    body = await request.json()
    console.log('API: body parsed', body)
  } catch (parseError) {
    console.error('API: Failed to parse request body:', parseError)
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }

  try {
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
    try {
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
    } catch (clientError) {
      console.error('API: Client creation/lookup failed:', clientError)
      return NextResponse.json(
        { error: 'Failed to process client data', details: String(clientError) },
        { status: 500 }
      )
    }

    // Save lead form
    let leadForm
    try {
      leadForm = await payload.create({
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
    } catch (leadFormError) {
      console.error('API: Lead form creation failed:', leadFormError)
      return NextResponse.json(
        { error: 'Failed to save lead form', details: String(leadFormError) },
        { status: 500 }
      )
    }

    // Get email settings - non-critical, continue even if it fails
    let settings: any = null
    try {
      settings = await payload.findGlobal({
        slug: 'settings',
      })
    } catch (settingsError) {
      console.warn('API: Could not load settings, using defaults:', settingsError)
    }

    // Send notification email - non-critical, log error but don't fail
    try {
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
    } catch (emailError) {
      console.error('API: Email sending failed (non-critical):', emailError)
      // Don't return error - form submission was still successful
    }

    return NextResponse.json(
      { success: true, id: leadForm.id, clientId: client },
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











