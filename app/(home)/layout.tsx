import type { Metadata, Viewport } from 'next';
import { AnalyticsBody, AnalyticsHead } from '@/components/Analytics';
import './flight.css';

/**
 * Root layout for the homepage. It carries its own stylesheet (no Tailwind
 * preflight) so the landing pages in app/(landing) can't change it, and the
 * other way round.
 */

const DESCRIPTION =
  'AllDazeWork is a two-person design and engineering studio in Atlanta. We build brands, websites, and products for local businesses and founders getting ready to launch.';

export const metadata: Metadata = {
  metadataBase: new URL('https://alldaze.studio'),
  title: {
    default: 'AllDazeWork — Atlanta design and engineering studio',
    template: '%s · AllDazeWork',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: 'AllDazeWork' }],
  creator: 'AllDazeWork',
  publisher: 'AllDazeWork',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alldaze.studio',
    siteName: 'AllDazeWork',
    title: 'AllDazeWork — Atlanta design and engineering studio',
    description: DESCRIPTION,
    images: [{ url: '/site/team.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllDazeWork — Atlanta design and engineering studio',
    description: DESCRIPTION,
    images: ['/site/team.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#BFD7FF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1026' },
  ],
};

// Sets data-mode before first paint so the night sky never flashes day.
const MODE_SCRIPT = `(function(){var m=null;try{m=localStorage.getItem('adw-mode')}catch(e){}
if(m!=='day'&&m!=='night'){m=matchMedia('(prefers-color-scheme: dark)').matches?'night':'day'}
document.documentElement.setAttribute('data-mode',m);})();`;

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap"
        />
        <AnalyticsHead />
      </head>
      <body>
        <AnalyticsBody />
        {children}
      </body>
    </html>
  );
}
