import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

/**
 * POST /api/contact
 *
 * Validates the form payload, screens out bots via honeypot,
 * and dispatches to whichever email provider is configured
 * via EMAIL_PROVIDER (see lib/email.ts).
 */

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  /** Honeypot — bots fill this in, real users won't */
  website?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — silently accept and drop, so bots don't get feedback to refine their attack
  if (body.website && body.website.trim().length > 0) {
    console.log('[contact] honeypot triggered, dropping submission');
    return NextResponse.json({ ok: true });
  }

  // Validate
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const projectType = body.projectType?.trim() ?? '';

  const errors: string[] = [];
  if (!name) errors.push('Name is required.');
  if (name.length > 200) errors.push('Name is too long.');
  if (!email) errors.push('Email is required.');
  else if (!isValidEmail(email)) errors.push('Please provide a valid email address.');
  if (!message) errors.push('Message is required.');
  if (message.length > 5000) errors.push('Message is too long (5000 character max).');

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 400 });
  }

  try {
    const result = await sendContactEmail({ name, email, projectType, message });
    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    // Log full detail on the server, but don't leak internals to the client
    console.error('[contact] send failed:', err);
    return NextResponse.json(
      { error: 'Could not send your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
