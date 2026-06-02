/**
 * REPLACES the existing app/layout.tsx.
 *
 * Changes from the previous version:
 *   1. Swapped Inter for Nunito (AllDazeWork brand font)
 *   2. Refined metadata to match the studio's current positioning
 *   3. Moved viewport into its own export (Next.js 14 convention)
 *   4. Added OpenGraph + Twitter metadata for link previews
 */

import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/Navbar';
import TalonChat from '@/components/chat/TalonChat';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: {
    default: 'AllDazeWork — Atlanta Design Duo',
    template: '%s · AllDazeWork',
  },
  description:
    "A design duo from Atlanta. Web design, UX strategy, and the engineering to ship it — for small businesses and independent brand owners.",
  keywords: [
    'Atlanta web design',
    'design studio',
    'UX strategy',
    'web development',
    'small business website',
    'brand design',
    'Atlanta designer',
  ],
  authors: [{ name: 'AllDazeWork' }],
  creator: 'AllDazeWork',
  publisher: 'AllDazeWork',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alldaze.studio',
    siteName: 'AllDazeWork',
    title: 'AllDazeWork — Atlanta Design Duo',
    description:
      'Web design, UX strategy, and the engineering to ship it — for Atlanta small businesses and independent brand owners.',
    // TODO: add an og-image at /public/og-image.png (1200x630)
    // images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllDazeWork — Atlanta Design Duo',
    description:
      'Web design, UX strategy, and the engineering to ship it — for Atlanta small businesses and independent brand owners.',
    // images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0052FF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth scroll-pt-20 lg:scroll-pt-32 ${nunito.variable}`}>
      <body className={`${nunito.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        {children}
        <TalonChat />
      </body>
    </html>
  );
}
