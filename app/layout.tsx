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
import Script from 'next/script';
import './globals.css';

// Google Tag Manager container ID
const GTM_ID = 'GTM-52SJQJGM';

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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${nunito.className} antialiased bg-white text-gray-900`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
