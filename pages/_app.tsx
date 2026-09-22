import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import AutoTheme from '../components/autoTheme';

const inter = Inter({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute='class' enableSystem>
        <AutoTheme />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </div>
  );
}
