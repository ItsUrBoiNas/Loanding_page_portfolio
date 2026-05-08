import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { quizLeadSchema, type QuizLeadData } from '@/lib/quiz-validations'
import OpenAI from 'openai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = 'nasir.henken@Outlook.com,henkenssnasir@gmail.com,hnas62200@gmail.com'

const BUSINESS_TYPE_NAMES: Record<string, string> = {
  'local-service': 'local service',
  'ecommerce': 'e-commerce',
  'coaching-consulting': 'coaching/consulting',
  'restaurant-food': 'restaurant',
  'real-estate': 'real estate',
  'other': 'business',
}

const REVENUE_LABELS: Record<string, string> = {
  'starter': 'Under $5k/mo',
  'growing': '$5k-$20k/mo',
  'established': '$20k-$50k/mo',
  'doing-well': '$50k+/mo',
}

function getEmailSubject(data: QuizLeadData): string {
  const hasWebsite = data.hasWebsite === 'has-website-not-working'
  const noWebsite = data.hasWebsite === 'no-website'
  const phoneNotRinging = data.problems.includes("My phone isn't ringing enough")
  const invisibleOnGoogle = data.problems.includes('Nobody can find me on Google')
  const wantsMoreMoney = data.goals.includes('More money in my pocket')
  const wearingEveryHat = data.problems.includes("I'm wearing every hat and it's exhausting")
  const isStarter = data.revenueRange === 'starter'
  const bizType = BUSINESS_TYPE_NAMES[data.businessType] || 'business'

  if (hasWebsite && phoneNotRinging) {
    return "I found the reason your website isn't getting calls"
  }
  if (noWebsite && isStarter) {
    return `${data.name}, here's the fastest way to get your first 10 customers`
  }
  if (hasWebsite && invisibleOnGoogle) {
    return "Your competitors are ranking above you. Here's why."
  }
  if (noWebsite && wantsMoreMoney) {
    return `${data.name}, you're leaving money on the table every single day`
  }
  if (wearingEveryHat) {
    return "You don't have a marketing problem. You have a leverage problem."
  }
  return `${data.name}, I put together a growth plan for your ${bizType} business`
}

function buildOpenAIPrompt(data: QuizLeadData): string {
  const bizType = BUSINESS_TYPE_NAMES[data.businessType] || 'business'
  const hasWebsite = data.hasWebsite === 'has-website-not-working'
  const revenue = REVENUE_LABELS[data.revenueRange] || 'Unknown'

  return `You are Nasir, a business consultant and web designer from Fort Myers, FL. You run Naslogic. Write a personalized business plan email for this lead.

LEAD DATA:
- Name: ${data.name}
- Business type: ${bizType}
- Has website: ${hasWebsite ? 'Yes, but it is not getting them customers' : 'No, they need one'}
- Problems: ${data.problems.join(', ')}
- Goals: ${data.goals.join(', ')}
- Revenue range: ${revenue}

WRITING RULES:
- Write in first person as Nasir, conversational tone, like texting a smart friend
- NEVER use these words: "solutions", "leverage", "optimize", "synergy"
- NEVER use emojis or emoticons
- Short paragraphs, lots of white space
- Use HTML formatting for the email (h2, p, br, ul/li tags)
- Keep it under 800 words

EMAIL STRUCTURE (use these exact section headers as h2 tags):
1. "WHERE YOU'RE AT" -- Reflect their quiz answers back in natural language. Show you understand their situation.
2. "WHAT TO FIX FIRST" -- Give 2-3 genuinely actionable recommendations they can do TODAY for FREE, specific to their business type and problems. Be specific, not generic.
3. "THE ONE THING THAT CHANGES EVERYTHING" -- ${hasWebsite ? 'Their current website is failing them. Explain why a professional landing page designed around conversion psychology will change their business.' : 'They do not have a website yet. Explain why getting a professional landing page is the single highest-ROI move they can make right now.'} Make this a natural bridge, not a hard sell.
4. "IF YOU WANT HELP WITH THAT" -- Soft CTA: "I build custom landing pages for ${bizType} businesses. Check out what we build at naslogic.com or just reply to this email."

Sign off as:
-- Nasir, Naslogic, Fort Myers, FL`
}

function buildFallbackPlan(data: QuizLeadData): string {
  const bizType = BUSINESS_TYPE_NAMES[data.businessType] || 'business'
  const hasWebsite = data.hasWebsite === 'has-website-not-working'

  return `
<h2 style="color: #fff; font-family: sans-serif;">WHERE YOU'RE AT</h2>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">Hey ${data.name},</p>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">So you're running a ${bizType} business${hasWebsite ? ' with a website that is not pulling its weight' : ' without a website yet'}. Your biggest pain points right now are: ${data.problems.join(', ').toLowerCase()}. And what you really want is: ${data.goals.join(', ').toLowerCase()}.</p>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">I get it. That is exactly where most of the business owners I work with start.</p>

<h2 style="color: #fff; font-family: sans-serif;">WHAT TO FIX FIRST</h2>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">Here are a few things you can do right now, today, for free:</p>
<ul style="color: #ccc; font-family: sans-serif; line-height: 1.7;">
  <li>Google your own business name. What shows up? If it is not you on page one, claim your Google Business Profile right now. It is free and takes 10 minutes.</li>
  <li>Ask your last 3 happy customers to leave you a Google review this week. Reviews are the number one trust signal for local businesses.</li>
  <li>Look at your top competitor's website. Write down 3 things they do better than you online. That is your gap list.</li>
</ul>

<h2 style="color: #fff; font-family: sans-serif;">THE ONE THING THAT CHANGES EVERYTHING</h2>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">${hasWebsite ? 'Your current website is not converting because it was not built to convert. Most websites are digital brochures. What you need is a landing page built around one goal: getting people to pick up the phone or fill out a form.' : 'You do not have a website yet, and honestly, that might be an advantage. You get to skip all the mistakes and start with something built to actually bring in customers from day one.'}</p>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">A professional landing page designed around conversion psychology is the single highest-ROI marketing investment a ${bizType} business can make.</p>

<h2 style="color: #fff; font-family: sans-serif;">IF YOU WANT HELP WITH THAT</h2>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">I build custom landing pages for ${bizType} businesses. Pages that are designed to make your phone ring. Check out what we build at <a href="https://naslogic.com" style="color: #3B82F6;">naslogic.com</a> or just reply to this email.</p>
<p style="color: #ccc; font-family: sans-serif; line-height: 1.7;">-- Nasir, Naslogic, Fort Myers, FL</p>
`
}

function buildAdminNotificationHtml(data: QuizLeadData): string {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  return `
<h2 style="font-family: sans-serif; color: #111;">[NASLOGIC] Quiz Lead: ${data.name}</h2>
<hr />
<h3>Contact Info:</h3>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<hr />
<h3>Quiz Answers:</h3>
<p><strong>Business Type:</strong> ${BUSINESS_TYPE_NAMES[data.businessType] || data.businessType}</p>
<p><strong>Website Status:</strong> ${data.hasWebsite === 'has-website-not-working' ? 'Has website, not working' : 'No website'}</p>
<p><strong>Problems:</strong></p>
<ul>${data.problems.map((p) => `<li>${p}</li>`).join('')}</ul>
<p><strong>Goals:</strong></p>
<ul>${data.goals.map((g) => `<li>${g}</li>`).join('')}</ul>
<p><strong>Revenue Range:</strong> ${REVENUE_LABELS[data.revenueRange] || data.revenueRange}</p>
<p><strong>Timestamp:</strong> ${timestamp}</p>
`
}

export async function GET() {
  return NextResponse.json({ message: 'Quiz lead API is active' })
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

    // Validate with Zod
    const parseResult = quizLeadSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.issues },
        { status: 400 },
      )
    }

    const data = parseResult.data

    // Generate business plan via OpenAI (with fallback)
    let planHtml: string

    try {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
        throw new Error('OpenAI API key not configured')
      }

      const openai = new OpenAI({ apiKey })
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: buildOpenAIPrompt(data) },
          { role: 'user', content: 'Generate the personalized business plan email now.' },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      })

      planHtml = completion.choices[0]?.message?.content || buildFallbackPlan(data)
    } catch (aiError) {
      console.error('OpenAI generation failed, attempting Gemini fallback:', aiError)
      
      try {
        const geminiApiKey = process.env.GEMINI_API_KEY
        if (!geminiApiKey) throw new Error('Gemini API key not configured')

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: buildOpenAIPrompt(data) + '\n\nGenerate the personalized business plan email now.' }
                ]
              }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 1500,
              }
            })
          }
        )

        if (!geminiRes.ok) {
          throw new Error(`Gemini API failed: ${geminiRes.statusText}`)
        }

        const geminiData = await geminiRes.json()
        planHtml = geminiData.candidates[0].content.parts[0].text || buildFallbackPlan(data)
      } catch (geminiError) {
        console.error('Gemini fallback failed, using static fallback:', geminiError)
        planHtml = buildFallbackPlan(data)
      }
    }

    // Wrap the plan in a styled email template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background: #0a0a0f; color: #ccc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 30px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #fff; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em;">NASLOGIC</h1>
      <p style="color: #64748B; font-size: 0.85rem;">Your Custom Business Plan</p>
    </div>
    <div style="line-height: 1.7; font-size: 1rem;">
      ${planHtml}
    </div>
    <hr style="border: none; border-top: 1px solid #222; margin: 40px 0;" />
    <p style="color: #64748B; font-size: 0.75rem; text-align: center;">
      This email was generated by Naslogic based on your quiz answers.
      <br />
      <a href="https://naslogic.com" style="color: #3B82F6;">naslogic.com</a>
    </p>
  </div>
</body>
</html>`

    // Determine email subject
    const subject = getEmailSubject(data)

    // Send plan email to lead
    const adminEmails = (process.env.ADMIN_EMAILS || ADMIN_EMAILS)
      .split(',')
      .map((e) => e.trim())

    const [leadEmailResult, adminEmailResult] = await Promise.all([
      sendEmail({
        to: data.email,
        subject,
        html: emailHtml,
        fromName: 'Nasir from Naslogic',
      }),
      sendEmail({
        to: adminEmails,
        subject: `[NASLOGIC] Quiz Lead: ${data.name} -- ${BUSINESS_TYPE_NAMES[data.businessType] || data.businessType}`,
        html: buildAdminNotificationHtml(data),
      }),
    ])

    if (!leadEmailResult.success) {
      console.error('Lead email failed:', leadEmailResult.error)
    }
    if (!adminEmailResult.success) {
      console.error('Admin notification failed:', adminEmailResult.error)
    }

    return NextResponse.json(
      { success: true, message: 'Quiz submitted successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Quiz lead error:', error)
    return NextResponse.json(
      { error: 'Failed to process quiz submission', details: String(error) },
      { status: 500 },
    )
  }
}
