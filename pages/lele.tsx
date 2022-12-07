import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../src/entities/Community';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../src/mapper/communityByDTO';
import { CommunityDTO } from '../src/entityDTOs/CommunityDTO';
import Link from 'next/link';
import { LeLeCommunityListQuery } from '../src/data/LebendigesLehre';
import Footer from '../src/components/Footer/Footer';
import WebsiteMenu from '../src/components/Header/WebsiteMenu';

export const LebendigesLehreLandingPageSlug: string = 'lele';
export interface ILebendigesLehreLandingPageProps {
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

export const getStaticProps: GetStaticProps<ILebendigesLehreLandingPageProps> = async () => {
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;

  /**
   * fetch all communities to create static pathes
   */
  let communityList: Community[] = new Array();
  await cdnClient
    .fetch(LeLeCommunityListQuery)
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

export default function LebendigesLehreLandingPage(props: ILebendigesLehreLandingPageProps) {
  // TODO: Dummy data, integrate with API
  const meta = props.meta;
  const communities = props.communities;
  const communitiesAsKeywordList: string[] = communities.map(community => community.name);

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
        <title>Schafe vorm Fenster für die Stiftung Lebendiges Lehre</title>
        <meta
          name="description"
          content={`Wann ist wer wo in ${communitiesAsKeywordList.join(', ')}?`}
        />
        <meta name="keywords" content={`${communitiesAsKeywordList.join(', ')}`} />
        <meta property="og:image" content="" />
        <meta name="geo.region" content="DE-NI" />
        <link rel="canonical" href={`${meta.canonicalUrl}lele`} />
        <meta property="og:url" content={`${meta.canonicalUrl}lele`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(typeof(_etracker) === "object") {
                et_eC_Wrapper({
                  et_et: '${process.env.NEXT_PUBLIC_ETRACKER_CODE}',
                  et_pagename: 'Schafe vorm Fenster',
                  et_areas: 'LeLe',
                   _etr: { eoBlocked:true },
                });
              }
            `,
          }}
        />
      </Head>
      <div className="flex flex-col min-h-screen/cut bg-gradient-to-b bg-brand">
        <WebsiteMenu />
        <main
          className="flex items-center flex-auto flex-grow max-w-screen-md p-0 m-auto"
          id="dorfsuche"
        >
          <div className="items-center">
            <article className="px-4 py-8 m-auto prose prose-lg text-center md:px-8">
              <h1 className="text-5xl font-semibold text-white md:text-6xl">
                Deine digitale Terminliste
              </h1>
              <p className="text-2xl">
                Erfahre was wann wo in deinem Ort los ist. Einfach per Smartphone.
              </p>
            </article>
            <div className="max-w-screen-sm m-auto community-search ">
              <div className="h-16 px-4 py-2 md:px-8">
                <input
                  type="text"
                  placeholder="Finde deinen Ort ..."
                  value={searchTerm}
                  onChange={handleChange}
                  className="w-full font-body text-2xl pt-2 pb-1.5 px-4 leading-none border border-gray-400 rounded focus:border-secondary"
                />
              </div>
              <div className="relative h-full px-4 pb-8 mt-2">
                {searchTerm.length > 0 && (
                  <ul className="absolute z-50 px-4 py-2 text-lg rounded left-4 right-4 md:left-8 md:right-8 bg-secondary">
                    {searchResults.map(item => (
                      <li key={item._id}>
                        <Link href={`/${item.slug}`}>
                          <a className="block px-2 py-1">
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
        <header className="px-4 py-8 text-center bg-white flex-0">
          <p className="mb-8 text-xl">
            Die digitale Terminliste für Lehre und Umgebung ist ein Projekt von "Schafe vorm
            Fenster" in Zusammenarbeit mit der
          </p>
          <div className="inline-block w-auto h-16 m-auto mb-4">
            <a href="https://lebendigeslehre.de/" target="_blank">
              <img
                className="px-4 mx-auto mb-4"
                src="/landingpages/lebendigeslehre/LebendigesLehre.png"
                alt="Stiftung Lebendiges Lehre"
              />
            </a>
          </div>
        </header>
      </div>
      <aside className="px-4 py-12 mx-auto">
        <h2 className="mb-8 text-4xl text-center">
          unsere {communities.length} Orte
          <span className="block text-lg">in und um Lehre</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
          {communities.map(community => (
            <Link href={`/${community.slug}`} key={community.slug + community._id}>
              <a className="relative block bg-gray-200 h-44">
                {community?.wikimediaCommonsImages?.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={community.wikimediaCommonsImages[0]}
                  />
                )}
                <div className="absolute bottom-0 w-full p-2 pt-4 text-center text-white bg-gradient-to-t from-gray-800 to-transparent">
                  <h4 className="text-xl font-normal ">{community.name}</h4>
                  <p className="text-xs font-light">(Gemeinde {community.municipality.name})</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </aside>
      <Footer community={communities[0]} />
    </div>
  );
}
