import nodemailer, { type Transporter } from 'nodemailer'
import { NextResponse } from 'next/server'

/**
 * Form notifications (homepage contact form and /atlanta audit form).
 *
 * Sends through any SMTP mailbox. Production uses the Hostinger mailbox
 * hello@alldaze.studio (smtp.hostinger.com:465) and delivers to NOTIFY_TO.
 *
 *   SMTP_HOST   default smtp.hostinger.com
 *   SMTP_PORT   default 465 (implicit TLS); 587 uses STARTTLS
 *   SMTP_USER   mailbox address, e.g. hello@alldaze.studio
 *   SMTP_PASS   mailbox password
 *   SMTP_FROM   optional From address; defaults to SMTP_USER
 *   NOTIFY_TO   where notifications go, e.g. design@alldazework.com
 */
function mailConfig() {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.NOTIFY_TO
  if (!user || !pass || !to) return null
  const port = Number(process.env.SMTP_PORT || 465)
  return {
    transport: {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port,
      secure: port === 465,
      auth: { user, pass },
      // Fail fast so a slow mail server can't leave the form spinning.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
    from: process.env.SMTP_FROM || user,
    to,
  }
}

let transporter: Transporter | null = null
let transporterKey = ''
function getTransporter(cfg: NonNullable<ReturnType<typeof mailConfig>>) {
  const key = JSON.stringify(cfg.transport)
  if (!transporter || key !== transporterKey) {
    transporter = nodemailer.createTransport(cfg.transport)
    transporterKey = key
  }
  return transporter
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const name = str(body.name, 200)
  const email = str(body.email, 320)
  const business = str(body.business, 300)
  const goal = str(body.goal, 200)
  const message = str(body.message, 2000)
  const website = str(body.website, 300)
  // Which form sent it: the /atlanta audit form (default) or the homepage contact form.
  const fromHome = body.source === 'homepage'
  const esc = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  // Honeypot — bots fill the hidden "website" field. Silently accept and drop
  // so they don't get feedback to refine their attack.
  if (website.length > 0) {
    return NextResponse.json({ success: true })
  }

  // basic validation
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const cfg = mailConfig()
  if (!cfg) {
    console.error('[audit-request] SMTP_USER, SMTP_PASS and NOTIFY_TO must be set')
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  try {
    await getTransporter(cfg).sendMail({
      from: `"AllDazeWork Site" <${cfg.from}>`,
      to: cfg.to,
      replyTo: email,
      subject: fromHome ? `New project inquiry — ${name}` : `New audit request — ${name}`,
      text: `
Name:     ${name}
Email:    ${email}
Business: ${business || '—'}
Goal:     ${goal || '—'}
Message:  ${message || '—'}
Source:   ${fromHome ? 'Homepage contact form' : 'Audit request'}

Reply directly to this email to respond.
      `.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:520px;color:#17160F">
          <p style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888">${fromHome ? 'New project inquiry' : 'New audit request'} · alldaze.studio</p>
          <h2 style="margin:.4em 0 1em">${esc(name)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888;width:90px">Email</td><td style="padding:10px 0;border-top:1px solid #eee"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Business</td><td style="padding:10px 0;border-top:1px solid #eee">${esc(business) || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Goal</td><td style="padding:10px 0;border-top:1px solid #eee">${esc(goal) || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888;vertical-align:top">Message</td><td style="padding:10px 0;border-top:1px solid #eee;white-space:pre-wrap">${esc(message) || '—'}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:13px;color:#888">Reply to this email to respond directly to ${esc(name)}.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
