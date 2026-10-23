import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Global Minds Academy — Premier Education for Classes 1–12, JEE & NEET',
    template: '%s | Global Minds Academy',
  },
  description:
    'Comprehensive education platform for Indian students — CBSE, ICSE, Tamil Nadu State Board, JEE Main, JEE Advanced, NEET UG preparation with expert faculty, live classes, and personalised learning.',
  keywords: [
    'education', 'tuition', 'coaching', 'JEE preparation', 'NEET preparation',
    'CBSE', 'ICSE', 'Tamil Nadu State Board', 'Samacheer Kalvi',
    'online learning', 'classes 1-12', 'mock tests', 'entrance exam',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Global Minds Academy',
    title: 'Global Minds Academy — Premier Education for Classes 1–12, JEE & NEET',
    description: 'Comprehensive education platform for Indian students.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
