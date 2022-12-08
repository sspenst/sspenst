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
          <link rel='icon' href='/ss.jpeg' />
          <meta name='description' content='sspenst.com' />
        </Head>
        <body className='bg-neutral-900 text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;