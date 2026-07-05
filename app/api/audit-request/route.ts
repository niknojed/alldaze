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
  const { name, email, business, goal, website } = await req.json()

  // Honeypot — bots fill the hidden "website" field. Silently accept and drop
  // so they don't get feedback to refine their attack.
  if (website && String(website).trim().length > 0) {
    return NextResponse.json({ success: true })
  }

  // basic validation
  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: `"AllDazeWork Site" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO,
      replyTo: email,
      subject: `New audit request — ${name}`,
      text: `
Name:     ${name}
Email:    ${email}
Business: ${business || '—'}
Goal:     ${goal || '—'}

Reply directly to this email to respond.
      `.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:520px;color:#17160F">
          <p style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888">New audit request · alldaze.studio</p>
          <h2 style="margin:.4em 0 1em">${name}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888;width:90px">Email</td><td style="padding:10px 0;border-top:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Business</td><td style="padding:10px 0;border-top:1px solid #eee">${business || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Goal</td><td style="padding:10px 0;border-top:1px solid #eee">${goal || '—'}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:13px;color:#888">Reply to this email to respond directly to ${name}.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
