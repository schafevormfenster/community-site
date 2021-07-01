import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta httpEquiv="refresh" content="14400" />
          <meta httpEquiv="expires" content="14400" />
          <meta name="locale" content="de_DE" />
          <meta name="robots" content="all" />
          <meta name="author" content="Schafe vorm Fenster UG" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@schafeamfenster" />
          <meta name="twitter:creator" content="@schafeamfenster" />
        </Head>
        <body className="w-screen m-0 p-0 bg-gray-200 text-black font-body font-normal text-base leading-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
