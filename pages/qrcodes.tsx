import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SvFLogo from '../src/components/Images/SvFLogo';
import ReactMarkdown from 'react-markdown';
import QrCode from '../src/components/QrCode/QrCode';
import HomepageQrCode from '../src/components/QrCode/HomepageQrCode';
import PureQrCode from '../src/components/QrCode/PureQrCode';

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
      <header className="py-4 text-center">
        <div className="inline-block w-20 h-20 m-auto">
          <Link href={`/`}>
            <a title="zur Startseite">
              <SvFLogo />
            </a>
          </Link>
        </div>
        <p className="text-lg text-gray-600 font-title">Schafe vorm Fenster</p>
      </header>
      <main className="px-4 pb-8 md:px-8" id="kontakt">
        <div className="grid grid-cols-1 prose prose-lg ">
          <div className="col-span-1">
            <h2>QR Codes</h2>
            <h3>Homepage</h3>
            <h4>Print / Flyer</h4>
            <HomepageQrCode
              url="https://www.schafe-vorm-fenster.de/"
              campaign="Flyer"
              medium="Print"
            />
            <h4>Label / Apple</h4>
            <PureQrCode url="https://svf.li/a" />
            <h4>App Einstieg (Finde dein Dorf)</h4>
            <QrCode path="" campaign="Flyer" medium="Print" />
            <h3>Print / Flyer Kurzweg</h3>
            <QrCode path="" campaign="FlyerKurzweg" medium="Print" />
            <h4>Penkun (Flyer)</h4>
            <HomepageQrCode
              url="https://schafe-vorm-fenster.de/penkun"
              campaign="Flyer"
              medium="Print"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
