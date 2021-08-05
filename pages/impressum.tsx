import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SvFLogo from '../src/components/Images/SvFLogo';
import ReactMarkdown from 'react-markdown';

const ReactComment = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: `<!--${text}-->` }} />;
};

export interface ILegalpageProps {
  content: { imprint: any; privacy: any };
}

export const getStaticProps: GetStaticProps<ILegalpageProps> = async () => {
  const imprintMd = await require(`../content/homepage/imprint.md`);
  const imprintJson = JSON.stringify(imprintMd);

  const privacyMd = await require(`../content/homepage/privacy.md`);
  const privacyJson = JSON.stringify(privacyMd);

  return {
    props: {
      content: {
        imprint: imprintJson,
        privacy: privacyJson,
      },
    },
    revalidate: false,
  };
};

export default function Legalpage(props: ILegalpageProps) {
  // TODO: Dummy data, integrate with API
  const content = props.content;
  const imprintText = JSON.parse(content.imprint).default;
  const privacyText = JSON.parse(content.privacy).default;

  return (
    <div className="max-w-screen-md m-auto bg-white">
      <Head>
        <title>Impressum und Datenschutzerklärung der Schafe vorm Fenster UG</title>
        <meta
          name="description"
          content="Impressum und Datenschutzerklärung der Schafe vorm Fenster UG."
        />
        <meta name="geo.region" content="DE-MV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(typeof(_etracker) === "object") {
                et_eC_Wrapper({
                  et_et: '${process.env.NEXT_PUBLIC_ETRACKER_CODE}',
                  et_pagename: 'Impressum',
                  et_areas: 'About',
                   _etr: { eoBlocked:true },

                });
              }
            `,
          }}
        />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 prose prose-lg ">
          <div className="col-span-1 sm:col-span-2 text-center">
            <h2>Sprich uns an!</h2>
          </div>
          <div className="col-span-1 pb-8 text-center leading-tight">
            <img
              className="rounded-full h-40 w-40 m-auto mb-6"
              src="/team/christian.jpg"
              alt="Christian Sauer"
            />
            <p>
              <strong>Christian Sauer</strong>
            </p>
            <p>
              Projektkoordinator
              <br />
              <a href="mailto:christian@schafe-vorm-fenster.de?cc=jan@schafe-vorm-fenster.de&amp;subject=Hallo Christian.&amp;body=Hallo Christian, ich bin ... komme aus ... und finde Euer Projekt ... Dabei interessiere ich mich besonders für ... und würde gerne wissen ...">
                christian@schafe-vorm-fenster.de
              </a>
              <br />
              <a href="tel:++4915678689704‬">+49 156 78689704‬</a>
            </p>
          </div>
          <div className="col-span-1 text-center leading-tight">
            <img
              className="rounded-full h-40 w-40 m-auto mb-6"
              src="/team/jan.jpg"
              alt="Jan-Henrik Hempel"
            />
            <p>
              <strong>Jan-Henrik Hempel</strong>
            </p>
            <p>
              Technischer Leiter
              <br />
              <a href="mailto:jan@schafe-vorm-fenster.de?cc=christian@schafe-vorm-fenster.de&amp;subject=Hallo Jan.&amp;body=Hallo Jan, ich bin ... komme aus ... und finde Euer Projekt ... Dabei interessiere ich mich besonders für ... und würde gerne wissen ...">
                jan@schafe-vorm-fenster.de
              </a>
              <br />
              <a href="tel:++491751661003">+49 175 1661003</a>
            </p>
          </div>
        </div>
      </main>
      {
        <footer className="bg-gray-100  px-8 py-4">
          <ReactComment text={'googleoff: index'} />
          <aside className="prose prose-sm px-4 py-8 md:px-8" id="impressum">
            {imprintText && <ReactMarkdown>{imprintText}</ReactMarkdown>}
          </aside>
          <aside className="prose prose-sm px-4 py-8 md:px-8" id="datenschutz">
            {privacyText && <ReactMarkdown>{privacyText}</ReactMarkdown>}
          </aside>
        </footer>
      }
    </div>
  );
}
