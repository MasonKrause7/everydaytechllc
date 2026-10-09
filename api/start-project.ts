// Option ids must stay in sync with src/data/projectIntake.ts.
const services: Record<string, string> = {
  'single-page-website': 'Single-page website',
  '3-page-website': '3-page website',
  'web-app': 'Web app',
  'mobile-app': 'Mobile app',
  'full-tech-suite': 'Full tech suite',
  seo: 'SEO',
  'ai-integration': 'AI integration',
  'something-else': 'Something else',
  'not-sure': 'Not sure yet',
}

const stages: Record<string, string> = {
  idea: 'Has an idea (no business yet)',
  'existing-business': 'Runs a business or organization',
  improving: 'Has something to improve',
}

const industries: Record<string, string> = {
  'restaurant-food': 'Restaurant & food',
  retail: 'Retail & shopping',
  'health-wellness': 'Health & wellness',
  'beauty-fitness': 'Beauty & fitness',
  'home-services': 'Home services & trades',
  'professional-services': 'Professional services',
  'real-estate': 'Real estate',
  nonprofit: 'Nonprofit & community',
  other: 'Other',
}

const timelines: Record<string, string> = {
  asap: 'ASAP (within 4 weeks)',
  '1-2-months': '1–2 months',
  '2-6-months': '2–6 months',
  flexible: 'Flexible',
}

const paymentPlans: Record<string, string> = {
  standard: 'Standard (2 payments)',
  split: 'Split (4 payments)',
  extended: 'Extended (up to 8 payments)',
  'not-sure': 'Not sure yet',
}

const sourceKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer']

const contactEmail = 'mason@everydaytechllc.com'
const contactPhone = '(931) 551-6823'

type ProjectRequest = {
  intent: 'project' | 'idea'
  service: string
  service_other: string | null
  stage: string
  industry: string | null
  description: string | null
  timeline: string
  budget_amount: number | null
  budget_unsure: boolean
  below_minimum: boolean
  open_to_flexible: boolean
  business_context: string | null
  payment_plan: string | null
  name: string
  email: string
  phone: string | null
  company: string | null
  source: Record<string, string>
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

const error = (message: string, status: number) => Response.json({ error: message }, { status })

function parseRequest(body: Record<string, unknown>): ProjectRequest | string {
  const text = (key: string, max: number) => {
    const value = body[key]
    const trimmed = typeof value === 'string' ? value.trim() : ''
    if (trimmed.length > max) throw new Error(`Please keep each answer under ${max} characters.`)
    return trimmed
  }
  const optional = (key: string, max: number) => text(key, max) || null
  const choice = (key: string, options: Record<string, string>) => {
    const value = text(key, 100)
    return value in options ? value : ''
  }

  try {
    const service = choice('service', services)
    const stage = choice('stage', stages)
    const timeline = choice('timeline', timelines)
    if (!service || !stage || !timeline) {
      return 'Please answer each question before submitting.'
    }

    const name = text('name', 100).replace(/\s+/g, ' ')
    const email = text('email', 254)
    if (!name || !email) return 'Please fill in your name and email.'
    if (!emailPattern.test(email)) return 'Please enter a valid email address.'

    const description = optional('description', 5000)
    if (stage === 'idea' && !description) return 'Please tell us a little about your idea.'

    const budgetUnsure = body.budgetUnsure === true
    const rawBudget = body.budgetAmount
    const budgetAmount =
      !budgetUnsure && typeof rawBudget === 'number' && Number.isInteger(rawBudget) && rawBudget > 0
        ? Math.min(rawBudget, 999_999_999)
        : null
    if (!budgetUnsure && budgetAmount === null) return 'Please share a budget or choose "Not sure yet".'

    const belowMinimum = body.belowMinimum === true && budgetAmount !== null

    const source: Record<string, string> = {}
    if (typeof body.source === 'object' && body.source !== null) {
      for (const key of sourceKeys) {
        const value = (body.source as Record<string, unknown>)[key]
        if (typeof value === 'string' && value.trim()) source[key] = value.trim().slice(0, 500)
      }
    }

    return {
      intent: stage === 'idea' ? 'idea' : 'project',
      service,
      service_other: service === 'something-else' ? optional('serviceOther', 200) : null,
      stage,
      industry: stage === 'idea' ? null : choice('industry', industries) || null,
      description,
      timeline,
      budget_amount: budgetAmount,
      budget_unsure: budgetUnsure,
      below_minimum: belowMinimum,
      open_to_flexible: belowMinimum && body.openToFlexible === true,
      business_context: belowMinimum ? optional('businessContext', 5000) : null,
      payment_plan: belowMinimum ? null : choice('paymentPlan', paymentPlans) || null,
      name,
      email,
      phone: optional('phone', 40),
      company: stage === 'idea' ? null : optional('company', 120),
      source,
    }
  } catch (parseError) {
    return parseError instanceof Error ? parseError.message : 'Invalid request.'
  }
}

const formatBudget = (request: ProjectRequest) =>
  request.budget_amount === null
    ? 'Not sure yet'
    : `$${request.budget_amount.toLocaleString('en-US')}`

function buildOwnerEmail(request: ProjectRequest, dashboardUrl: string) {
  const rows: [string, string | null][] = [
    ['Name', request.name],
    ['Email', request.email],
    ['Phone', request.phone],
    ['Business', request.company],
    ['Type', request.intent === 'idea' ? 'Idea' : 'Project'],
    ['Service', request.service_other ? `${services[request.service]}: ${request.service_other}` : services[request.service]],
    ['Stage', stages[request.stage]],
    ['Industry', request.industry && industries[request.industry]],
    ['Timeline', timelines[request.timeline]],
    ['Budget', formatBudget(request)],
    ['Below starting price', request.below_minimum ? 'Yes' : null],
    ['Open to flexible arrangements', request.below_minimum ? (request.open_to_flexible ? 'Yes' : 'No') : null],
    ['Payment preference', request.payment_plan && paymentPlans[request.payment_plan]],
    ...Object.entries(request.source).map(([key, value]): [string, string] => [key, value]),
  ]
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]))
  const paragraphs: [string, string | null][] = [
    [request.intent === 'idea' ? 'The idea' : 'What they want to build or improve', request.description],
    ['More about them', request.business_context],
  ]

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#0a0f1f;">
      <h2 style="margin:0 0 16px;">New ${request.intent === 'idea' ? 'idea' : 'project request'} from ${escapeHtml(request.name)}</h2>
      <table style="border-collapse:collapse;">${filled
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#4a5068;vertical-align:top;">${label}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}</table>
      ${paragraphs
        .filter(([, value]) => value)
        .map(
          ([label, value]) =>
            `<p style="margin:20px 0 6px;color:#4a5068;">${label}</p><p style="margin:0;white-space:pre-wrap;">${escapeHtml(value as string)}</p>`,
        )
        .join('')}
      <p style="margin:28px 0 0;"><a href="${dashboardUrl}" style="color:#3b6bff;font-weight:600;">View all requests in Supabase</a></p>
    </div>`

  const text = [
    ...filled.map(([label, value]) => `${label}: ${value}`),
    ...paragraphs.filter(([, value]) => value).flatMap(([label, value]) => ['', `${label}:`, value as string]),
    '',
    `View all requests: ${dashboardUrl}`,
  ].join('\n')

  const subject = `${request.below_minimum ? '[Below minimum] ' : ''}New ${request.intent === 'idea' ? 'idea' : 'project request'} from ${request.name}`

  return { subject, html, text }
}

function buildCustomerEmail(request: ProjectRequest) {
  const firstName = request.name.split(' ')[0]
  const reachOut = `call or text us at ${contactPhone}, or reply to this email`

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0a0f1f;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for reaching out to Everyday Tech! We've received your ${request.intent === 'idea' ? 'idea' : 'project request'} and will review the details and get back to you within a day or two.</p>
      <p>In the meantime, if your request is urgent or you'd like more info, feel free to ${reachOut}.</p>
      <p>Talk soon,<br />Mason<br />Everyday Tech LLC</p>
    </div>`

  const text = [
    `Hi ${firstName},`,
    '',
    `Thanks for reaching out to Everyday Tech! We've received your ${request.intent === 'idea' ? 'idea' : 'project request'} and will review the details and get back to you within a day or two.`,
    '',
    `In the meantime, if your request is urgent or you'd like more info, feel free to ${reachOut}.`,
    '',
    'Talk soon,',
    'Mason',
    'Everyday Tech LLC',
  ].join('\n')

  return { subject: 'We received your request', html, text }
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return new Response(null, { status: 405, headers: { Allow: 'POST' } })
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, SUPABASE_URL, SUPABASE_SECRET_KEY } =
      process.env
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL || !SUPABASE_URL || !SUPABASE_SECRET_KEY) {
      console.error('Project intake is missing Supabase or Resend environment variables')
      return error('The project form is not available right now.', 500)
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return error('Invalid request.', 400)
    }
    if (typeof body !== 'object' || body === null) {
      return error('Invalid request.', 400)
    }

    const honeypot = (body as Record<string, unknown>).website
    if (typeof honeypot === 'string' && honeypot.trim()) {
      return Response.json({ ok: true })
    }

    const projectRequest = parseRequest(body as Record<string, unknown>)
    if (typeof projectRequest === 'string') {
      return error(projectRequest, 400)
    }

    const insert = await fetch(`${SUPABASE_URL}/rest/v1/project_requests`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SECRET_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(projectRequest),
    })
    if (!insert.ok) {
      console.error('Supabase insert failed', insert.status, await insert.text())
      return error(
        `Your request could not be submitted. Please try again or email us at ${contactEmail}.`,
        502,
      )
    }

    const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0]
    const dashboardUrl = `https://supabase.com/dashboard/project/${projectRef}/editor`
    const ownerEmail = buildOwnerEmail(projectRequest, dashboardUrl)
    const customerEmail = buildCustomerEmail(projectRequest)
    const ownerInboxes = CONTACT_TO_EMAIL.split(',').map((address) => address.trim())

    const emails = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        { from: CONTACT_FROM_EMAIL, to: ownerInboxes, reply_to: projectRequest.email, ...ownerEmail },
        { from: CONTACT_FROM_EMAIL, to: [projectRequest.email], reply_to: ownerInboxes[0], ...customerEmail },
      ]),
    })
    if (!emails.ok) {
      console.error('Resend batch request failed', emails.status, await emails.text())
    }

    return Response.json({ ok: true })
  },
}
