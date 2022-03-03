import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SvFLogo from '../src/components/Images/SvFLogo';
import ReactMarkdown from 'react-markdown';
import QrCode from '../src/components/QrCode/QrCode';

const ReactComment = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: `<!--${text}-->` }} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      content: {},
    },
    revalidate: false,
  };
};

export default function QrCodeOverview() {
  // TODO: Dummy data, integrate with API

  return (
    <div className="max-w-screen-md m-auto bg-white">
      <Head>
        <title>QR Codes der Schafe vorm Fenster UG</title>
        <meta name="description" content="QR Codes der Schafe vorm Fenster UG." />
        <meta name="geo.region" content="DE-MV" />
      </Head>
      <header className="text-center py-4">
        <div className="inline-block w-20 h-20 m-auto">
          <Link href={`/`}>
            <a title="zur Startseite">
              <SvFLogo />
            </a>
          </Link>
        </div>
        <p className="font-title text-lg  text-gray-600">Schafe vorm Fenster</p>
      </header>
      <main className="pb-8 px-4 md:px-8" id="kontakt">
        <div className="grid grid-cols-1 prose prose-lg ">
          <div className="col-span-1">
            <h2>QR Codes</h2>
            <h3>Print / Flyer</h3>
            <QrCode path="" campaign="Flyer" medium="Print" />
            <h3>Print / Flyer Kurzweg</h3>
            <QrCode path="" campaign="FlyerKurzweg" medium="Print" />
          </div>
        </div>
      </main>
    </div>
  );
}
