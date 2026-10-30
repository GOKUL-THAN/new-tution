import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Global Minds Academy — Premier Education for Classes 6–12, JEE & NEET',
    template: '%s | Global Minds Academy',
  },
  description:
    'Comprehensive education platform for Indian students — CBSE, ICSE, Tamil Nadu State Board, JEE Main, JEE Advanced, NEET UG preparation with live classes, structured curriculum, and personalised learning.',
  keywords: [
    'education', 'tuition', 'coaching', 'JEE preparation', 'NEET preparation',
    'CBSE', 'ICSE', 'Tamil Nadu State Board', 'Samacheer Kalvi',
    'online learning', 'classes 6-12', 'mock tests', 'entrance exam',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Global Minds Academy',
    title: 'Global Minds Academy — Premier Education for Classes 6–12, JEE & NEET',
    description: 'Comprehensive education platform for Indian students.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo-emblem.svg',
    apple: '/logo.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0F4C5C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GMA" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          {children}
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
