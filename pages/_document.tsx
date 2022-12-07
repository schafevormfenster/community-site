import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Incident from '../src/components/Messages/Incident';

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
        <body className="flex flex-col w-screen h-screen p-0 m-0 text-base font-normal leading-normal text-black bg-white font-body print:h-297mm print:w-190mm print:px-10mm print:overflow-hidden print:text-sm hyphens-auto">
          <main className="flex-grow">
            <Main />
          </main>
          <Incident message="Ein aktuelles Problem mit dem Geocoding führt dazu, dass einige Termine nicht angezeigt werden. Wir arbeiten bereits an einer kurzfristigen Lösung. (07.12.2022, 06:46)" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
