/**
 * Root layout for landing pages (e.g. /atlanta). Uses Tailwind and Nunito.
 * The homepage has its own root layout in app/(home).
 */

import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { AnalyticsBody, AnalyticsHead } from '@/components/Analytics';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: {
    default: 'AllDazeWork — Atlanta Design Studio',
    template: '%s · AllDazeWork',
  },
  description:
    'A digital design studio in Atlanta — we design, build, and launch brands, sites, and apps for founders and teams.',
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
    title: 'AllDazeWork — Atlanta Design Studio',
    description:
      'A digital design studio in Atlanta — we design, build, and launch brands, sites, and apps for founders and teams.',
    // TODO: add an og-image at /public/og-image.png (1200x630)
    // images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllDazeWork — Atlanta Design Studio',
    description:
      'A digital design studio in Atlanta — we design, build, and launch brands, sites, and apps for founders and teams.',
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
    <html lang="en" className={`scroll-smooth scroll-pt-20 lg:scroll-pt-24 ${nunito.variable}`}>
      <head>
        <AnalyticsHead />
      </head>
      <body className={`${nunito.className} antialiased bg-white text-gray-900`}>
        <AnalyticsBody />
        {children}
      </body>
    </html>
  );
}
