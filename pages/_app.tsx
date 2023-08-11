import '../styles/global.css';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import Background from '../components/background';
import Footer from '../components/footer';
import Header from '../components/header';

const inter = Inter({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function setFaviconHref(darkMediaQuery: MediaQueryList | MediaQueryListEvent) {
      const favicon = document.getElementById('favicon') as HTMLLinkElement | null;

      if (favicon) {
        favicon.href = darkMediaQuery.matches ? '/favicon-dark.png' : 'favicon.png';
      }
    }

    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setFaviconHref(darkMediaQuery);

    darkMediaQuery.addEventListener('change', setFaviconHref);

    return () => darkMediaQuery.removeEventListener('change', setFaviconHref);
  }, []);

  return (
    <div className={classNames(inter.className, 'overflow-hidden')}>
      <ThemeProvider attribute='class'>
        <Background />
        <Header />
        <main className='pt-24'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
