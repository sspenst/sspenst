import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' type='image/png' href='/ss-192-maskable.png' />
          <link rel='icon' href='/favicon.ico' />
          <meta name='theme-color' content='rgb(23 23 23)' />
        </Head>
        <body className='bg-white dark:bg-neutral-900 text-black dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
