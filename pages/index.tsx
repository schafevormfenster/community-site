import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../src/entities/Community';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../src/mapper/communityByDTO';
import { CommunityDTO, CommunityDTOteaserQueryFields } from '../src/entityDTOs/CommunityDTO';
import Link from 'next/link';

export interface IHomepageProps {
  communities: Community[];
  meta: { canonicalUrl: string };
}

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<IHomepageProps> = async () => {
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;

  /**
   * fetch all communities to create static pathes
   */
  const communityListQuery = `*[_type == "community" && slug.current!='' && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOteaserQueryFields} }`;
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

  return {
    props: {
      meta: {
        canonicalUrl: canonicalUrl,
      },
      communities: communityList,
    },
    revalidate: 14400,
  };
};

export default function Homepage(props: IHomepageProps) {
  // TODO: Dummy data, integrate with API
  const meta = props.meta;
  const communities = props.communities;

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
    <div className="w-full">
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
      <div className="min-h-screen flex flex-col bg-brand">
        <nav className="max-w-screen-md m-auto h-20 flex-initial flex items-center text-center">
          <div>
            <a
              className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-brand hover:border-brand whitespace-nowrap"
              href="https://www.schafe-vorm-fenster.de/"
            >
              Über das Projekt
            </a>
            <a
              className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-brand hover:border-brand whitespace-nowrap"
              href="https://www.schafe-vorm-fenster.de/funktionen"
            >
              Alle Funktonen
            </a>
            <a
              className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-brand hover:border-brand whitespace-nowrap"
              href="https://www.schafe-vorm-fenster.de/#tarifmodell"
            >
              Tarife
            </a>
            <a
              className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-brand hover:border-brand whitespace-nowrap"
              href="https://schafe-vorm-fenster.zendesk.com/hc/de"
            >
              Hilfe und Anleitungen
            </a>
          </div>
        </nav>
        <main
          className="max-w-screen-md m-auto flex-auto flex-grow flex items-center p-0"
          id="dorfsuche"
        >
          <div className="items-center">
            <article className="m-auto prose prose-lg px-4 py-8 md:px-8 text-center">
              <h1 className="text-5xl md:text-6xl font-semibold text-white">
                Deine digitale Terminliste.
              </h1>
              <p className="text-2xl">
                Erfahre was wann wo in deinem Dorf los ist. Einfach per Smartphone.
              </p>
            </article>
            <div className="max-w-screen-sm m-auto community-search ">
              <div className="h-16 px-4 md:px-8 py-2">
                <input
                  type="text"
                  placeholder="Finde dein Dorf ..."
                  value={searchTerm}
                  onChange={handleChange}
                  className="w-full font-body text-2xl pt-2 pb-1.5 px-4 leading-none border border-gray-400 rounded focus:border-secondary"
                />
              </div>
              <div className="relative h-full px-4 pb-8 mt-2">
                {searchTerm.length > 0 && (
                  <ul className="absolute text-lg left-4 right-4 md:left-8 md:right-8 bg-secondary rounded px-4 py-2 z-50">
                    {searchResults.map(item => (
                      <li key={item._id}>
                        <Link href={`/${item.slug}`}>
                          <a className="block py-1 px-2">
                            <strong className="font-semibold">{item.name}</strong> (Gemeinde{' '}
                            {item?.municipality?.name})
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
        <header className="flex-0 bg-gray-800 text-center py-8 px-4">
          <div className="inline-block w-auto h-16 m-auto mb-2">
            <img
              className="h-full w-auto mx-auto max-w-sm"
              src="/partner/SchafeVormFenster.svg"
              alt="Ein Projekt der Schafe vorm Fenster UG"
            />
          </div>
          <p className="font-body text-white text-sm uppercase mb-2">
            Die digitale Terminliste für dein Dorf
          </p>
          <p className="font-body text-3xl font-semibold text-white">
            aus Schlakow für Vorpommern-Greifswald
          </p>
        </header>
      </div>
      <aside className="mx-auto px-4 py-12">
        <h2 className="text-4xl text-center mb-8">
          alle {communities.length} Dörfer
          <span className="block text-lg">in Vorpommern-Greifswald</span>
        </h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
          {communities.map(community => (
            <Link href={`/${community.slug}`} key={community.slug + community._id}>
              <a className="relative block h-44 bg-gray-200">
                {community?.wikimediaCommonsImages?.length > 0 && (
                  <img
                    className="h-full w-full object-cover"
                    src={community.wikimediaCommonsImages[0]}
                  />
                )}
                <div className="absolute w-full p-2 pt-4 bottom-0 text-center text-white bg-gradient-to-t from-gray-800 to-transparent">
                  <h4 className="text-xl font-normal ">{community.name}</h4>
                  <p className="text-xs font-light">(Gemeinde {community.municipality.name})</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
