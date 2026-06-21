'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  /** Top-tier site/page links (cross-page navigation). */
  pageLinks?: NavLink[];
  /** Second-tier in-page section anchors. */
  sectionLinks?: NavLink[];
}

// Top tier — links to dedicated pages.
// Anchors are absolute (`/...`) so they work from any page.
const defaultPageLinks: NavLink[] = [
  { href: '/', label: 'Work' },
  { href: '/articles', label: 'Articles' },
  { href: '/artifacts', label: 'Artifacts' },
];

// Second tier — in-page section anchors. Prefixed with `/` so clicking from
// Articles/Artifacts routes home first, then scrolls to the section.
const defaultSectionLinks: NavLink[] = [
  { href: '/#selected-work', label: 'Selected Work' },
  { href: '/#why-us', label: 'Why Us' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar({
  pageLinks = defaultPageLinks,
  sectionLinks = defaultSectionLinks,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  // Tier-2 (in-page anchors) retracts on scroll-down, returns on scroll-up.
  const [hideSecondary, setHideSecondary] = useState(false);

  // Track scroll direction. rAF-throttled + a small threshold to ignore jitter.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 6;   // ignore sub-pixel/trackpad jitter
    const REVEAL_AT = 80;  // always show within this many px of the top

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= REVEAL_AT) {
        setHideSecondary(false);
        lastY = y;
      } else if (Math.abs(delta) > THRESHOLD) {
        setHideSecondary(delta > 0); // down → hide, up → show
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* ─── Tier 1: site nav (logo + page links + Collab CTA) ─── */}
        <nav
          className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200"
          aria-label="Primary"
        >
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex items-center justify-between h-16 lg:h-20">
            {/* Logo → home */}
            <a
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-sm"
              aria-label="AllDazeWork — home"
            >
              <img src="/alldaze-logo.svg" alt="AllDazeWork" className="h-7 w-auto" />
            </a>
  
            {/* Desktop page links */}
            <div className="hidden lg:flex items-center gap-8">
              {pageLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 hover:text-[#0052FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0052FF] hover:bg-[#003ECC] text-white rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
              >
                Collab
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
  
            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-gray-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
  
        {/* ─── Tier 2: in-page section anchors (black bar, content-width, pill base) ─── */}
        {/* Lifted OUT of normal flow and clipped, so hiding it is a pure GPU
            transform — the page below never reflows on any frame (the previous
            height/translate combo re-laid-out all page sections per frame, which
            is what janked). The clip box sits flush under Tier 1; the bar slides
            up into it and tucks away cleanly. Layout space is held by the static
            spacer rendered just after the header. */}
        <div className="hidden lg:block absolute top-full inset-x-0 z-0 overflow-hidden pointer-events-none">
          <nav
            aria-label="On this page"
            aria-hidden={hideSecondary}
            className={`pointer-events-auto transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
              hideSecondary ? '-translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
              <div className="bg-black rounded-b-[32px] flex items-center gap-7 h-11 px-8">
                {sectionLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    tabIndex={hideSecondary ? -1 : 0}
                    className="text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white whitespace-nowrap transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
  
        {/* ─── Mobile dropdown: both tiers ─── */}
        {open && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-6 max-w-7xl py-4 flex flex-col">
              {/* Page links */}
              {pageLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-gray-900 hover:text-[#0052FF] border-b border-gray-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
  
              {/* In-page links */}
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 pt-5 pb-1">
                On this page
              </div>
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm font-semibold text-gray-600 hover:text-[#0052FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
  
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-4 group inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#0052FF] hover:bg-[#003ECC] text-white rounded-full text-sm font-semibold transition-colors"
              >
                Collab
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Reserves the Tier-2 band in flow so first-screen content keeps the exact
          position it had when the bar lived in the header. Static + non-sticky:
          it simply scrolls away, so the GPU-transformed overlay never triggers a
          layout pass. lg-only, matching the bar's `hidden lg:block`. */}
      <div aria-hidden className="hidden lg:block h-11" />
    </>
  );
}
