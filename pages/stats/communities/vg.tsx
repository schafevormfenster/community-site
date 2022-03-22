import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../../../src/entities/Community';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../../../src/mapper/communityByDTO';
import { CommunityDTO } from '../../../src/entityDTOs/CommunityDTO';
import Link from 'next/link';
import { vorpommernGreifswaldCommunityDetailListQuery } from '../../../src/data/VorpommernGreifswald';

export interface ICommunitiesProps {
  communities: Community[];
}

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<ICommunitiesProps> = async () => {
  /**
   * fetch all communities to create static pathes
   */
  let communityList: Community[] = new Array();
  await cdnClient
    .fetch(vorpommernGreifswaldCommunityDetailListQuery)
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
      communities: communityList,
    },
    revalidate: 14400,
  };
};

export default function Communities(props: ICommunitiesProps) {
  // TODO: Dummy data, integrate with API
  const communities = props.communities;

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
                    <Link href={`/${item.slug}`}>
                      <a className="inline-block py-1 px-2 whitespace-nowrap" target="_blank">
                        <strong className="font-semibold">{item.name}</strong> (Gemeinde{' '}
                        {item?.municipality?.name})
                      </a>
                    </Link>
                  </th>
                  <td>
                    <a
                      href={`https://www.geonames.org/${item._id.replace('geoname-', '')}/`}
                      className="whitespace-nowrap"
                      target="_blank"
                    >
                      {item._id}
                    </a>
                  </td>
                  <td>
                    {item.geoLocation.identifiers.wikidataId && (
                      <a
                        href={`https://www.wikidata.org/wiki/${item.geoLocation.identifiers.wikidataId}`}
                        className="inline-block whitespace-nowrap px-2"
                        target="_blank"
                      >
                        {item.geoLocation.identifiers.wikidataId}
                      </a>
                    )}
                    {!item.geoLocation.identifiers.wikidataId && (
                      <a
                        href={`https://www.wikidata.org/w/index.php?search=${encodeURIComponent(
                          item.name
                        )}`}
                        className="inline-block whitespace-nowrap px-2"
                        target="_blank"
                      >
                        <b className="text-red-600">Search</b> at Wikidata
                      </a>
                    )}
                  </td>
                  <td>
                    {item.wikimediaCommonsImages?.length > 0 && (
                      <a
                        href={item.wikimediaCommonsImages[0]}
                        className="whitespace-nowrap"
                        target="_blank"
                      >
                        {item.wikimediaCommonsImages[0].replace(
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/',
                          '.../'
                        )}
                      </a>
                    )}
                    {(!item.wikimediaCommonsImages || item.wikimediaCommonsImages?.length <= 0) && (
                      <a
                        href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(
                          item.name
                        )}`}
                        className="inline-block whitespace-nowrap px-2"
                        target="_blank"
                      >
                        <b className="text-red-600">Search</b> at Wikimedia Commons
                      </a>
                    )}
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
