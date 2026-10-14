import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

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

  try {
    await transporter.sendMail({
      from: `"AllDazeWork Site" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO,
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
