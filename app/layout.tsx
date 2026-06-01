import type {Metadata, Viewport} from 'next';
import './globals.css';
import {JsonLd} from '@/components/json-ld';
import {siteUrl, siteName, siteDescription} from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${siteName} Agent Commerce - Turn Websites Into AI Agent-Ready Stores`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteName} Agent Commerce - AI Agent-Ready E-Commerce Platform`,
    description: siteDescription,
    url: '/',
    siteName: siteName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} Agent Commerce - AI Agent-Ready E-Commerce`,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
