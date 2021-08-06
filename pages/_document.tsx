import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';
import NextGenerationEu from '../src/components/Sponsors/NextGenerationEu';

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
          <meta name="locale" content="de_DE" />
          <meta name="robots" content="all" />
          <meta name="author" content="Schafe vorm Fenster UG" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@schafeamfenster" />
          <meta name="twitter:creator" content="@schafeamfenster" />
        </Head>
        <body className="w-screen m-0 p-0 bg-white text-black font-body font-normal text-base leading-normal">
          <Main />
          <footer className="px-4 py-4">
            <div className="flex mb-4">
              <Link href={`/impressum/#kontakt`}>
                <a className="flex-auto mr-4 border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
                  Kontakt
                </a>
              </Link>
              <Link href={`/impressum/#impressum`}>
                <a className="flex-auto mr-4 border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
                  Impressum
                </a>
              </Link>
              <Link href={`/impressum/#datenschutz`}>
                <a className="flex-auto border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
                  Datenschutzerklärung
                </a>
              </Link>
            </div>
            <div className="pr-24">
              <NextGenerationEu />
            </div>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
