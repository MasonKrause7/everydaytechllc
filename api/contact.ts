type ContactFields = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

const maxLengths: Record<keyof ContactFields, number> = {
  name: 100,
  email: 254,
  phone: 40,
  company: 120,
  message: 5000,
}

const labels: Record<keyof ContactFields, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Business',
  message: 'Message',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

const error = (message: string, status: number) => Response.json({ error: message }, { status })

function parseFields(body: Record<string, unknown>): ContactFields | string {
  const read = (key: keyof ContactFields) => {
    const value = body[key]
    return typeof value === 'string' ? value.trim() : ''
  }

  const fields: ContactFields = {
    name: read('name').replace(/\s+/g, ' '),
    email: read('email'),
    phone: read('phone'),
    company: read('company'),
    message: read('message'),
  }

  if (!fields.name || !fields.email || !fields.message) {
    return 'Please fill in your name, email, and message.'
  }
  if (!emailPattern.test(fields.email)) {
    return 'Please enter a valid email address.'
  }
  for (const key of Object.keys(maxLengths) as (keyof ContactFields)[]) {
    if (fields[key].length > maxLengths[key]) {
      return `${labels[key]} must be ${maxLengths[key]} characters or fewer.`
    }
  }
  return fields
}

function buildEmail(fields: ContactFields) {
  const rows = (['name', 'email', 'phone', 'company'] as const)
    .filter((key) => fields[key])
    .map(
      (key) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#4a5068;">${labels[key]}</td><td style="padding:4px 0;">${escapeHtml(fields[key])}</td></tr>`,
    )
    .join('')

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#0a0f1f;">
      <h2 style="margin:0 0 16px;">New contact form submission</h2>
      <table style="border-collapse:collapse;">${rows}</table>
      <p style="margin:20px 0 6px;color:#4a5068;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(fields.message)}</p>
    </div>`

  const text = [
    ...(['name', 'email', 'phone', 'company'] as const)
      .filter((key) => fields[key])
      .map((key) => `${labels[key]}: ${fields[key]}`),
    '',
    fields.message,
  ].join('\n')

  return { html, text }
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return new Response(null, { status: 405, headers: { Allow: 'POST' } })
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.error('Contact form is missing Resend environment variables')
      return error('The contact form is not available right now.', 500)
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

    const fields = parseFields(body as Record<string, unknown>)
    if (typeof fields === 'string') {
      return error(fields, 400)
    }

    const { html, text } = buildEmail(fields)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(',').map((address) => address.trim()),
        reply_to: fields.email,
        subject: `New inquiry from ${fields.name}`,
        html,
        text,
      }),
    })

    if (!response.ok) {
      console.error('Resend request failed', response.status, await response.text())
      return error('Your message could not be sent. Please try again or email us directly.', 502)
    }

    return Response.json({ ok: true })
  },
}
