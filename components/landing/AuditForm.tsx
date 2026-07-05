'use client';

import React, { useState } from 'react';

declare global {
  interface Window {
    // Populated by the Google Tag Manager snippet in app/layout.tsx
    dataLayer?: Record<string, unknown>[];
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  business: string;
  goal: string;
  /** Honeypot — bots fill this in, real users won't see it */
  website: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  business: '',
  goal: '',
  website: '',
};

const inputClass =
  'w-full rounded-lg border border-line bg-white px-3 py-[11px] text-[.95rem] text-ink transition-colors duration-200 focus:outline-none focus:border-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1';
const labelClass = 'mb-1.5 block text-[.8rem] font-semibold text-ink';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuditForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    // Honeypot — if filled, it's a bot. Silently succeed without sending.
    if (form.website.trim().length > 0) {
      setStatus('success');
      return;
    }

    // Client-side validation
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error');
      setErrorMessage('Please add your name and email.');
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      // GA4 conversion event — fires only on a genuinely successful submission.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'audit_form_submit' });

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[300px] flex-col items-center justify-center rounded-xl bg-white px-[26px] py-8 text-center"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[1.05rem] font-semibold text-ink">Sent — check your inbox soon</p>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form
      id="audit-form"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-white px-[26px] py-7 text-body"
    >
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        className="absolute left-[-9999px] opacity-0"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        placeholder="Website (leave blank)"
        value={form.website}
        onChange={handleChange}
      />

      <div className="mb-[14px]">
        <label htmlFor="f-name" className={labelClass}>
          Name*
        </label>
        <input
          id="f-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="mb-[14px]">
        <label htmlFor="f-email" className={labelClass}>
          Email*
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="mb-[14px]">
        <label htmlFor="f-biz" className={labelClass}>
          Business
        </label>
        <input
          id="f-biz"
          name="business"
          type="text"
          autoComplete="organization"
          value={form.business}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass}
        />
      </div>

      <div className="mb-[14px]">
        <label htmlFor="f-goal" className={labelClass}>
          What&apos;s your goal?
        </label>
        <textarea
          id="f-goal"
          name="goal"
          rows={3}
          value={form.goal}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="mb-3 text-[.85rem] text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex w-full items-center justify-center gap-[.5em] rounded-lg border border-transparent bg-brand px-[1.4em] py-[.85em] text-[.95rem] font-semibold text-white transition-colors duration-[250ms] ease-[cubic-bezier(.25,.6,.3,1)] hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {isSubmitting ? 'Sending…' : 'Request my audit'}
      </button>

      <p className="mt-3 text-center text-[.78rem] text-muted">
        We&apos;ll only use your email to send your audit and reply.
      </p>
    </form>
  );
}
