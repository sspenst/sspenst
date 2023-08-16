import '../styles/global.css';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React from 'react';
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
