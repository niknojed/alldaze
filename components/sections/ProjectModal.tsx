'use client';

import React, { useEffect, useRef } from 'react';
import { X, Star, ArrowRight } from 'lucide-react';
import type { Project } from './SelectedWork';

interface ProjectModalProps {
  project: Project | null;
  /** Total number of projects — used for "01 / 04" indicator */
  totalProjects: number;
  /** Zero-based index of the currently open project */
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
}

export default function ProjectModal({
  project,
  totalProjects,
  currentIndex,
  onClose,
  onNext,
}: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!project) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Defer focus until after the open animation kicks in
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previousActiveElement.current?.focus();
    };
  }, [project]);

  // Keyboard handlers — Escape closes, Right arrow goes to next project
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose, onNext]);

  // Basic focus trap — keep tab/shift+tab cycling inside the modal
  useEffect(() => {
    if (!project) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [project]);

  if (!project) return null;

  const { detail } = project;
  const titleId = `modal-title-${project.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        tabIndex={-1}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-modal-fade"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl max-w-7xl w-full max-h-[92vh] overflow-y-auto animate-modal-scale"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-900 text-gray-900 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Position indicator — top left */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-10 text-xs font-mono text-gray-400 tabular-nums">
          {String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(totalProjects).padStart(2, '0')}
        </div>

        {/* Grid layout: left column (title + desc + image), right column (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-6 pt-16 sm:p-10 sm:pt-16 lg:p-16 lg:pt-20">

          {/* ── Left column ── */}
          <div className="lg:col-span-7 lg:flex lg:flex-col">
            <h2
              id={titleId}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-5"
            >
              {project.name}
            </h2>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8 lg:mb-10">
              {detail.description}
            </p>

            {/* Hero image — 4:3 on mobile; on desktop it grows to fill the
                column so its bottom aligns with the sidebar (no gap below). */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[320px]">
              {detail.heroImage ? (
                // Using a plain <img> here so the component works without next/image config.
                // Swap to <Image> from next/image once your images are in /public.
                // Absolutely positioned so it fills the box on all sides even when
                // the box grows via flex-1 on desktop.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={detail.heroImage}
                  alt={detail.heroImageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm text-gray-500">
                  Hero image placeholder
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: sidebar ── */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-10">

            {/* Objective */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">
                Objective
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {detail.objective}
              </p>
            </div>

            {/* Our Contribution */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">
                Our Contribution
              </h3>
              <ul className="space-y-1.5" role="list">
                {detail.contributions.map((item) => (
                  <li key={item} className="text-base text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Biggest Impact */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">
                Biggest Impact
              </h3>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl font-bold text-gray-900">
                  {detail.biggestImpact.statValue}
                </span>
                <span className="text-base text-gray-600">
                  {detail.biggestImpact.statLabel}
                </span>
              </div>
              {detail.biggestImpact.showStars && (
                <div className="flex gap-1 mt-3" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 lg:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
              >
                Back to Projects
              </button>
              <button
                type="button"
                onClick={onNext}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
              >
                See Next Project
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
        NOTE for setup: add these keyframes to tailwind.config.js.
        // tailwind.config.js
        theme: {
          extend: {
            animation: {
              'modal-fade': 'modal-fade 200ms ease-out',
              'modal-scale': 'modal-scale 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
              'modal-fade': {
                from: { opacity: '0' },
                to: { opacity: '1' },
              },
              'modal-scale': {
                from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
                to: { opacity: '1', transform: 'scale(1) translateY(0)' },
              },
            },
          },
        },
      */}
    </div>
  );
}
