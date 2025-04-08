import type {Metadata} from 'next';
import {Inter, Geist, Geist_Mono} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Assistant Chef',
  description: 'Recipe book',
  manifest: '/manifest.json',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  appleWebApp: {
    title: 'apple-mobile-web-app-status-bar-style',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
