import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../src/entities/Community';
import { News } from '../src/entities/News';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../src/mapper/communityByDTO';
import { CommunityDTO, CommunityDTOcoreQueryFields } from '../src/entityDTOs/CommunityDTO';
import Link from 'next/link';
import SvFLogo from '../src/components/Images/SvFLogo';
import ReactMarkdown from 'react-markdown';
import NextGenerationEu from '../src/components/Sponsors/NextGenerationEu';

const ReactComment = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: `<!--${text}-->` }} />;
};

export interface IHomepageProps {
  communities: Community[];
  meta: { canonicalUrl: string };
  content: { welcome: any; explain: any };
}

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<IHomepageProps> = async () => {
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;

  /**
   * fetch all communities to create static pathes
   */
  const communityListQuery = `*[_type == "community" && slug.current!=''] | order(municipality->name asc) { ${CommunityDTOcoreQueryFields} }`;
  let communityList: Community[] = new Array();
  await cdnClient
    .fetch(communityListQuery)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response;
      if (communityDtoList)
        communityList = communityDtoList.map(communitytDto => {
          return communityByDTO(communitytDto);
        });
    })
    .catch(err => {
      console.warn(`The query to lookup all communities at sanity failed:`);
    });

  const welcomeMd = await require(`../content/homepage/welcome.md`);
  const welcomeJson = JSON.stringify(welcomeMd);

  const explainMd = await require(`../content/homepage/explain.md`);
  const explainJson = JSON.stringify(explainMd);

  return {
    props: {
      meta: {
        canonicalUrl: canonicalUrl,
      },
      content: {
        welcome: welcomeJson,
        explain: explainJson,
      },
      communities: communityList,
    },
    revalidate: false,
  };
};

export default function Homepage(props: IHomepageProps) {
  // TODO: Dummy data, integrate with API
  const meta = props.meta;
  const communities = props.communities;
  const content = props.content;
  const welcomeText = JSON.parse(content.welcome).default;
  const explainText = JSON.parse(content.explain).default;

  /** community search */
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results: Community[] = communities.filter(
      community =>
        community.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        community.municipality.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="max-w-screen-md m-auto bg-white">
      <Head>
        <title>Schafe vorm Fenster</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta property="og:image" content="" />
        <meta name="geo.region" content="DE-MV" />
        <link rel="canonical" href={`${meta.canonicalUrl}`} />
        <meta property="og:url" content={`${meta.canonicalUrl}`} />
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(typeof(_etracker) === "object") {
                et_eC_Wrapper({
                  et_et: '${process.env.NEXT_PUBLIC_ETRACKER_CODE}',
                  et_pagename: 'Schafe vorm Fenster',
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
          <SvFLogo />
        </div>
        <p className="font-title text-lg  text-gray-600">Schafe vorm Fenster</p>
      </header>

      <article className="prose prose-lg px-4 py-8 md:px-8 text-center">
        {welcomeText && <ReactMarkdown>{welcomeText}</ReactMarkdown>}
      </article>
      <main className="p-0" id="dorfsuche">
        <div className="community-search ">
          <div className="h-16 px-4 md:px-8 py-2">
            <input
              type="text"
              placeholder="Finde dein Dorf ..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded"
            />
          </div>
          <div className="relative h-full px-4 pb-8">
            {searchTerm.length > 0 && (
              <ul className="absolute left-4 right-4 md:left-8 md:right-8 bg-secondary px-4 py-2 z-50">
                {searchResults.map(item => (
                  <li key={item._id}>
                    <Link href={`/${item.slug}`}>
                      <a className="block py-1 px-2">
                        {item.name} (Gemeinde {item?.municipality?.name})
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr />
      </main>
      <article className="prose prose-lg px-4 py-8 md:px-8">
        {explainText && <ReactMarkdown>{explainText}</ReactMarkdown>}
      </article>
      <aside className="px-4 md:px-8 pb-8" id="kontakt">
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 prose prose-lg">
          <div className="col-span-1 sm:col-span-2 text-center">
            <h2>Sprich uns an!</h2>
            <p>Du hast noch Fragen oder Feedback für uns? Kontaktiere uns gerne direkt.</p>
          </div>
          <div className="col-span-1 text-center leading-tight">
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
      </aside>
      <aside className="px-4 md:px-8 pb-8 prose prose-lg" id="news">
        <hr />
        <a
          className="twitter-timeline"
          data-lang="de"
          data-height="800"
          data-theme="light"
          href="https://twitter.com/schafeamfenster?ref_src=twsrc%5Etfw"
        >
          Neuigkeiten
        </a>
      </aside>
      {/*
      <nav className="pb-8 text-center text-base px-4 md:px-8">
        <hr className="mb-8" />
        <h2 className="text-2xl mb-4">Alle Dörfer</h2>
        <p className="mb-4">
          Hier findest Du eine Liste aller Dörfer in Vorpommern-Greifswald. <br />
          Einfacher{' '}
          <Link href={`/#dorfsuche`}>
            <a className="text-secondary">findest Du dein Dorf</a>
          </Link>{' '}
          über die Suche weiter oben.
        </p>
        <ul className="text-sm">
          {communities.map(c => (
            <li className="inline-block px-2" key={c._id}>
              <Link href={`/${c.slug}`}>
                <a>
                  {c.name}, Gemeinde {c.municipality.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      */}
    </div>
  );
}
