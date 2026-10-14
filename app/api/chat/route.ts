import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { talonSystemPrompt } from '@/lib/talon';

/**
 * POST /api/chat
 *
 * Body: { messages: { role: 'user' | 'assistant', content: string }[], context?: string }
 *   context — the visitor's quick-review result, if they took it
 * Returns: { reply: string }
 *
 * Keeps ANTHROPIC_API_KEY server-side. The browser never sees it.
 *
 * Required env var:
 *   ANTHROPIC_API_KEY — get from https://console.anthropic.com/settings/keys
 */

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Model: Sonnet is a good quality/cost balance for a guide chatbot.
// For lower cost + faster replies, swap to 'claude-haiku-4-5-20251001'.
// Check https://docs.claude.com for the current model list.
const MODEL = 'claude-sonnet-4-6';

// Guardrails against abuse of a public endpoint
const MAX_MESSAGES = 40;        // cap conversation length
const MAX_CONTENT_LENGTH = 4000; // cap any single message

interface IncomingMessage {
  role?: string;
  content?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY is not set');
    return NextResponse.json(
      { error: 'Talon is offline right now. Reach the team at design@alldazework.com.' },
      { status: 500 }
    );
  }

  let body: { messages?: IncomingMessage[]; context?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  if (raw.length === 0) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
  }
  if (raw.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: 'This conversation has gotten long. Refresh to start fresh.' },
      { status: 400 }
    );
  }

  // Sanitize: only allow valid roles + string content within length limits
  const messages = raw
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CONTENT_LENGTH),
    }));

  // The API requires the conversation to open with a user turn.
  while (messages.length && messages[0].role !== 'user') messages.shift();

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No valid messages provided.' }, { status: 400 });
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1000,
      system: talonSystemPrompt(typeof body.context === 'string' ? body.context : ''),
      messages,
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: 'Talon didn’t answer. Try that again?' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] Anthropic request failed:', err);
    return NextResponse.json(
      { error: 'Talon couldn’t answer just now. Try again in a moment, or email design@alldazework.com.' },
      { status: 500 }
    );
  }
}
