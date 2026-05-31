/**
 * Email sending abstraction.
 *
 * Supports two providers, picked via the EMAIL_PROVIDER env var:
 *   - 'resend' (default) — uses Resend's API
 *   - 'gmail'             — uses Gmail SMTP via Nodemailer with an App Password
 *
 * The same `sendContactEmail()` function is used by /api/contact regardless of
 * which provider is active. Switch providers by changing the env var only —
 * no code changes required.
 *
 * Required env vars per provider:
 *
 *   EMAIL_PROVIDER=resend
 *     RESEND_API_KEY        e.g. re_xxxx
 *     CONTACT_FROM_EMAIL    must be on a Resend-verified domain
 *                           (or 'onboarding@resend.dev' for initial testing)
 *     CONTACT_TO_EMAIL      [email protected]
 *
 *   EMAIL_PROVIDER=gmail
 *     GMAIL_USER            the Google Workspace account that sends mail
 *                           (e.g. [email protected] — recommended dedicated sender)
 *     GMAIL_APP_PASSWORD    16-char App Password from
 *                           https://myaccount.google.com/apppasswords
 *                           (requires 2FA enabled on the account)
 *     CONTACT_FROM_EMAIL    display address (defaults to GMAIL_USER)
 *     CONTACT_TO_EMAIL      [email protected]
 */

import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface SendResult {
  provider: 'resend' | 'gmail';
  id?: string;
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  const provider = (process.env.EMAIL_PROVIDER ?? 'resend').toLowerCase();

  if (provider === 'gmail') {
    return sendViaGmail(payload);
  }
  if (provider === 'resend') {
    return sendViaResend(payload);
  }
  throw new Error(
    `Unknown EMAIL_PROVIDER "${provider}". Set EMAIL_PROVIDER to "resend" or "gmail".`
  );
}

// ─────────────────────────────────────────────────────────────
// Resend implementation
// ─────────────────────────────────────────────────────────────

async function sendViaResend(payload: ContactPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'design@alldazework.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `AllDazeWork Contact <${fromEmail}>`,
    to: [toEmail],
    replyTo: payload.email,
    subject: `New project inquiry from ${payload.name}`,
    html: buildEmailHtml(payload),
    text: buildEmailText(payload),
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message ?? 'unknown error'}`);
  }

  return { provider: 'resend', id: data?.id };
}

// ─────────────────────────────────────────────────────────────
// Gmail SMTP implementation (via Nodemailer)
// ─────────────────────────────────────────────────────────────

async function sendViaGmail(payload: ContactPayload): Promise<SendResult> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      'Gmail SMTP requires GMAIL_USER and GMAIL_APP_PASSWORD to be set'
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'design@alldazework.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || user;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: { user, pass },
  });

  // Quick credential check — surfaces auth issues at deploy time, not at first user submission
  // Note: this is a cheap operation, but feel free to remove if you want absolute minimal latency
  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"AllDazeWork Contact" <${fromEmail}>`,
    to: toEmail,
    replyTo: payload.email,
    subject: `New project inquiry from ${payload.name}`,
    html: buildEmailHtml(payload),
    text: buildEmailText(payload),
  });

  return { provider: 'gmail', id: info.messageId };
}

// ─────────────────────────────────────────────────────────────
// Shared HTML / text email templates
// ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml({ name, email, projectType, message }: ContactPayload): string {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /><title>New project inquiry</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="border-left: 4px solid #0052FF; padding-left: 20px; margin-bottom: 32px;">
          <h1 style="font-size: 22px; font-weight: 700; color: #0a0a0a; margin: 0 0 4px 0;">New project inquiry</h1>
          <p style="font-size: 14px; color: #6b7280; margin: 0;">From the alldaze.studio contact form</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; vertical-align: top; width: 120px;">
              <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">From</strong>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #0a0a0a;">${escapeHtml(name)}</strong><br />
              <a href="mailto:${escapeHtml(email)}" style="color: #0052FF; text-decoration: none;">${escapeHtml(email)}</a>
            </td>
          </tr>
          ${projectType ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; vertical-align: top;">
              <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Project type</strong>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
              ${escapeHtml(projectType)}
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; vertical-align: top;">
              <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</strong>
            </td>
            <td style="padding: 12px 0; color: #1f2937; white-space: pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br />')}</td>
          </tr>
        </table>
        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #9ca3af;">
          Reply directly to this email to respond to ${escapeHtml(name)}.
        </div>
      </body>
    </html>
  `;
}

function buildEmailText({ name, email, projectType, message }: ContactPayload): string {
  return [
    'New project inquiry from alldaze.studio',
    '',
    `From: ${name} <${email}>`,
    projectType ? `Project type: ${projectType}` : null,
    '',
    'Message:',
    message,
    '',
    '—',
    `Reply directly to this email to respond to ${name}.`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}
