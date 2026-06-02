'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './TalonChat.module.css';

interface Message {
  id: string;
  role: 'user' | 'talon';
  text: string;
}

const WELCOME =
  "Hey — I'm Talon, your guide here at The Eyrie. I keep a bird's-eye view of everything AllDazeWork builds. Looking to explore the work, scope a project, or just see if we're a fit? Point me where you want to go.";

const SUGGESTIONS = [
  'Show me your work',
  'What do you charge?',
  'Who do you work with?',
  'I want to start a project',
];

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

// Minimal, safe formatting: escape first, then add **bold**, mailto links, paragraphs
function formatText(text: string): string {
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  safe = safe.replace(
    /([a-zA-Z0-9._%+-]+@alldazework\.com)/g,
    '<a href="mailto:$1">$1</a>'
  );
  return safe
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

const EagleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 130" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="100" cy="44" r="8" />
    <path d="M100 40 L112 36 L104 47 Z" />
    <path d="M92 54 L100 100 L108 54 Z" />
    <path d="M96 54 C 74 40, 52 33, 22 26 C 42 35, 36 38, 46 43 C 28 40, 33 45, 42 49 C 24 47, 30 53, 40 56 C 58 53, 78 56, 96 60 Z" />
    <path d="M104 54 C 126 40, 148 33, 178 26 C 158 35, 164 38, 154 43 C 172 40, 167 45, 158 49 C 176 47, 170 53, 160 56 C 142 53, 122 56, 104 60 Z" />
  </svg>
);

export default function TalonChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: 'talon', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasInteracted = messages.some((m) => m.role === 'user');

  // Auto-scroll to the latest message / loader
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isThinking]);

  // Focus the input when the panel opens
  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => textareaRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const autosize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (isThinking || !trimmed) return;

      const userMsg: Message = { id: nextId(), role: 'user', text: trimmed };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput('');
      setIsThinking(true);
      // reset textarea height after clearing
      requestAnimationFrame(() => {
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
      });

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role === 'talon' ? 'assistant' : 'user',
              content: m.text,
            })),
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error ?? 'Request failed');
        }

        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'talon', text: data.reply },
        ]);
      } catch (err) {
        const msg =
          err instanceof Error && err.message
            ? err.message
            : 'Talon hit some turbulence. Try again in a moment, or email design@alldazework.com.';
        setMessages((prev) => [...prev, { id: nextId(), role: 'talon', text: msg }]);
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className={styles.root}>
      {/* ─── Launcher ─── */}
      <button
        type="button"
        className={`${styles.launcher} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close Talon chat' : 'Open Talon chat'}
        aria-expanded={isOpen}
      >
        <EagleIcon className={styles.eagle} />
        <svg
          className={styles.closeX}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* ─── Panel ─── */}
      <div
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label="Talon chat"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.headerBadge}>
            <EagleIcon className={styles.eagle} />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.headerTitleRow}>
              <span className={styles.headerName}>The Eyrie</span>
              <span className={styles.headerTag}>TALON</span>
            </div>
            <div className={styles.headerStatus}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>Online · surveying the studio</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages} ref={messagesRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.talon}`}
            >
              <div
                className={styles.bubble}
                dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
              />
            </div>
          ))}

          {isThinking && (
            <div className={`${styles.msg} ${styles.talon}`}>
              <div className={styles.bubble} style={{ padding: '10px 14px' }}>
                <div className={styles.orbitWrap}>
                  <div className={styles.orbit}>
                    <div className={styles.orbitPath} />
                    <svg className={styles.orbitBird} viewBox="0 0 24 16" fill="currentColor" aria-hidden="true">
                      <path d="M2 8 C7 5, 10 4, 12 8 C14 4, 17 5, 22 8 C17 7, 14 8, 12 9 C10 8, 7 7, 2 8 Z" />
                    </svg>
                  </div>
                  <span className={styles.orbitLabel}>Talon is circling…</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested chips (until first user message) */}
        {!hasInteracted && (
          <div className={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className={styles.chip}
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className={styles.composer}>
          <div className={styles.composerRow}>
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask Talon anything…"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autosize();
              }}
              onKeyDown={handleKeyDown}
              aria-label="Message Talon"
            />
            <button
              type="button"
              className={styles.sendBtn}
              onClick={() => send(input)}
              disabled={isThinking || !input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
