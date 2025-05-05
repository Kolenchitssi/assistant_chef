import type { Metadata, Viewport } from 'next';
import { Inter, Geist } from 'next/font/google';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import {
  // localStorageColorSchemeManager,
  // Button,
  createTheme,
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer/Footer';
import { SideMenu } from '@/components/Side-menu';
import StoreProvider from '@/core/store/StoreProvider';

import './globals.scss';

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'green',
  components: {
    Button: {
      defaultProps: {
        color: 'orange',
        variant: 'outline',
      },
    },
    // Button: Button.extend({
    //   defaultProps: {
    //     color: 'cyan',
    //     variant: 'outline',
    //   },
    // }),
  },
});

// const colorSchemeManager = localStorageColorSchemeManager({
//   key: 'my-app-color-scheme',
// }); //use only for Client Component

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Assistant Chef',
  description: 'Recipe book',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'apple-mobile-web-app-status-bar-style',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} ${geistSans.variable}`}>
        <MantineProvider
          /* colorSchemeManager={colorSchemeManager} */ theme={theme}
        >
          <StoreProvider>
            <div className="app">
              <Header />
              <div className="main-wrapper">
                <SideMenu />

                <main>{children}</main>
              </div>

              <Footer />
            </div>
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
