'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface ContactProps {
  /** Public-facing email shown in the sidebar — server-side recipient is set via env var */
  contactEmail?: string;
  /** Project type options shown in the dropdown */
  projectTypes?: string[];
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
  /** Honeypot field — bots fill this in, real users won't see it */
  website: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  projectType: '',
  message: '',
  website: '',
};

const defaultProjectTypes = [
  'Web Design',
  'UX Strategy',
  'Digital Marketing',
  'Google Ads & SEO',
  'Not sure yet',
];

export default function Contact({
  contactEmail = 'design@alldazework.com',
  projectTypes = defaultProjectTypes,
}: ContactProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section
      className="bg-white py-24 lg:py-32"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <SectionHeader
          label="Contact"
          number="08"
          heading="Let's build something good."
          description="Tell us what you're working on. We'll get back within a business day — usually faster."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* ── Left column: pitch + contact details ── */}
          <aside className="lg:col-span-5 flex flex-col gap-8 lg:gap-10">

            <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">
                Prefer email?
              </h3>
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center gap-2 text-base lg:text-lg font-semibold text-[#0052FF] hover:text-[#003ECC] transition-colors break-all"
              >
                <Mail size={18} aria-hidden="true" />
                {contactEmail}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
              </a>
              <p className="text-sm text-gray-600 mt-3">
                Comes straight to the people you'll work with.
              </p>
            </div>

            <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin size={18} aria-hidden="true" className="text-[#0052FF]" />
                Based in
              </h3>
              <p className="text-base text-gray-700">Atlanta, Georgia</p>
              <p className="text-sm text-gray-600 mt-2">
                Working with clients worldwide — but always happy to grab coffee with our Atlanta folks.
              </p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 text-white">
              <h3 className="text-lg lg:text-xl font-bold mb-3">
                Not sure if we're a fit?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Send a note anyway. If it's not the right project for us, we'll point you to someone better suited. We'd rather make a great referral than waste your time.
              </p>
            </div>
          </aside>

          {/* ── Right column: form ── */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <SuccessState onReset={() => setStatus('idle')} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-10 flex flex-col gap-6"
                noValidate
              >
                {/* Honeypot — hidden from real users, bots fill it */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="projectType" className="text-sm font-semibold text-gray-900">
                    Project type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  >
                    <option value="">Select a type (optional)</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-900">
                    Tell us about your project <span className="text-[#0052FF]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="What are you building? What's the timeline? What does success look like? A few sentences is plenty to get us started."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-y placeholder:text-gray-400"
                  />
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900"
                  >
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <p className="text-xs text-gray-500">
                    We'll only use your email to reply to this message.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0052FF] hover:bg-[#003ECC] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Helper components ───

interface FieldProps {
  label: string;
  name: string;
  type: 'text' | 'email';
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
}

function Field({
  label,
  name,
  type,
  required,
  value,
  onChange,
  disabled,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-[#0052FF] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
      />
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-16 flex flex-col items-center text-center min-h-[400px] justify-center"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <CheckCircle2 size={32} className="text-emerald-600" aria-hidden="true" />
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
        Got it — message received.
      </h3>
      <p className="text-base text-gray-600 max-w-md mb-8">
        Thanks for reaching out. One of us will get back to you within a business day, usually sooner. Talk soon.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-semibold text-[#0052FF] hover:text-[#003ECC] transition-colors"
      >
        Send another message
      </button>
    </div>
  );
}
