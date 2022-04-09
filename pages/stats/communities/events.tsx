import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import SanityClientConstructor from '@sanity/client';
import { EventsPerCommunityQuery } from '../../../src/data/EventsPerCommunityQuery';
import Link from 'next/link';
import { sortBy } from 'lodash';

export interface ICommunitiesStatsProps {
  communitiesEventStats: any[];
}

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<ICommunitiesStatsProps> = async () => {
  /**
   * fetch all communities to create static pathes
   */
  let communityStatsList: any[] = new Array();
  await cdnClient
    .fetch(EventsPerCommunityQuery)
    .then(response => {
      communityStatsList = response;
    })
    .catch(err => {
      console.warn(`The query to lookup all communities at sanity failed:`);
    });

  return {
    props: {
      communitiesEventStats: communityStatsList,
    },
    revalidate: 14400,
  };
};

export default function CommunitiesEventsStats(props: ICommunitiesStatsProps) {
  // TODO: Dummy data, integrate with API
  const communities = sortBy(props.communitiesEventStats, ['eventCount', 'name']).reverse();

  return (
    <div className="w-full">
      <Head>
        <title>Stats - Communities</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <div className="min-h-screen flex flex-col ">
        <main className="p-0 text-base" id="dorfliste">
          <table>
            <tbody>
              {communities.map(item => (
                <tr>
                  <th key={item._id} className="text-left">
                    <Link href={`/${item.slug.current}`}>
                      <a className="inline-block py-1 px-2 whitespace-nowrap" target="_blank">
                        <strong className="font-semibold">{item.name}</strong> (Gemeinde{' '}
                        {item?.municipality?.name})
                      </a>
                    </Link>
                  </th>
                  <td>
                    {item.eventCount > 50 ? <strong>{item.eventCount}</strong> : item.eventCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
