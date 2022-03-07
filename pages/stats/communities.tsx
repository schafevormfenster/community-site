import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../../src/entities/Community';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../../src/mapper/communityByDTO';
import { CommunityDTO, CommunityDTOdetailQueryFields } from '../../src/entityDTOs/CommunityDTO';
import Link from 'next/link';

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
  const communityListQuery = `*[_type == "community" && slug.current!='' && county_geoname_id == 8648415 && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOdetailQueryFields} }`;
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
                      <a className="inline-block py-1 px-2">
                        <strong className="font-semibold">{item.name}</strong> (Gemeinde{' '}
                        {item?.municipality?.name})
                      </a>
                    </Link>
                  </th>
                  <td>
                    {item.geoLocation.identifiers.wikidataId && (
                      <a
                        href={`https://www.wikidata.org/wiki/${item.geoLocation.identifiers.wikidataId}`}
                        className="inline-block px-2"
                      >
                        {item.geoLocation.identifiers.wikidataId}
                      </a>
                    )}
                  </td>
                  <td>
                    {item.wikimediaCommonsImages?.length > 0 && (
                      <a href={item.wikimediaCommonsImages[0]}>
                        {item.wikimediaCommonsImages[0].replace(
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/',
                          '.../'
                        )}
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
