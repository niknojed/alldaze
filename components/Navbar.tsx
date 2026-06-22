'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Home } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  /** In-page section anchors shown in the nav. */
  links?: NavLink[];
}

// Single-page site — every item is an in-page section anchor.
// "Home" (the back-to-top icon) and "Collab" (the contact CTA) are rendered
// explicitly, so they're intentionally not in this list.
const defaultLinks: NavLink[] = [
  { href: '#selected-work', label: 'Our Work' },
  { href: '#why-us', label: 'The Team' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50">
      <nav
        className="bg-white/80 backdrop-blur-md border-b border-gray-200"
        aria-label="Primary"
      >
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex items-center justify-between h-16 lg:h-20">
          {/* Logo → top of page */}
          <a
            href="#hero"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-sm"
            aria-label="AllDazeWork — home"
          >
            <img src="/alldaze-logo.svg" alt="AllDazeWork" className="h-7 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#hero"
              className="text-gray-600 hover:text-[#0052FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-sm"
              aria-label="Back to top"
            >
              <Home size={18} aria-hidden="true" />
            </a>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#0052FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
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

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 max-w-7xl py-4 flex flex-col">
            <a
              href="#hero"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-base font-semibold text-gray-900 hover:text-[#0052FF] border-b border-gray-100 transition-colors"
            >
              <Home size={18} aria-hidden="true" />
              Home
            </a>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-semibold text-gray-900 hover:text-[#0052FF] border-b border-gray-100 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
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
  );
}
