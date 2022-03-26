import React from 'react';
import { sortBy } from 'lodash';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community, CommunityExcerpt } from '../src/entities/Community';
import { News } from '../src/entities/News';
import NewsTeaser from '../src/components/News/NewsTeaser';
import NewsArrangement from '../src/components/News/NewsArrangement';
import SanityClientConstructor from '@sanity/client';
import { first, join } from 'lodash';
import { Event } from '../src/entities/Event';
import { communityByDTO, communityExcerptByDTO } from '../src/mapper/communityByDTO';
import {
  CommunityDTO,
  CommunityDTOcoreQueryFields,
  CommunityDTOdetailQueryFields,
} from '../src/entityDTOs/CommunityDTO';
import { EventDTO, EventDTOdetailQueryFields } from '../src/entityDTOs/EventDTO';
import { eventByDTO } from '../src/mapper/eventByDTO';
import Calendar from '../src/components/EventDisplay/Calendar';
import { NewsDTO, NewsDTOteaserQueryFields } from '../src/entityDTOs/NewsDTO';
import { newsByDTO } from '../src/mapper/newsByDTO';
import CommunityIntroAsNewsTeaserFormat from '../src/components/CommunityHeader/CommunityIntroAsNewsTeaserFormat';
import CommunityIntroWithoutNews from '../src/components/CommunityHeader/CommunityIntroWithoutNews';
import CommunityIntroPrint from '../src/components/CommunityHeader/CommunityIntroPrint';
import { leLeCommunityListQuery } from '../src/data/LebendigesLehre';
import { vorpommernGreifswaldCommunityListQuery } from '../src/data/VorpommernGreifswald';
import Footer from '../src/components/Footer/Footer';
import { GeoPoint } from '../src/types/GeoLocation';

export interface IPageProps {
  community: Community;
  events: Event[];
  news: News[];
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

/**
 * fetch community data incl. image and municipality
 */
const fetchCommunity = async (slug: string): Promise<Community> => {
  console.time('fetchCommunity');

  const query = `*[_type == "community" && slug.current == $slug]{ ${CommunityDTOdetailQueryFields} }`;
  const queryParams = {
    slug: slug,
  };

  const community: Community = await cdnClient
    .fetch(query, queryParams)
    .then(response => {
      const communityDto: CommunityDTO = first(response);
      return communityByDTO(communityDto);
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed.`);
      return null;
    });
  console.timeEnd('fetchCommunity');
  return community;
};

/**
 * Fetch all other communities of the same municipality, exclude the current one.
 */
const fetchCommunitiesInMunicipality = async (
  currentCommunity: Community
): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesInMunicipality');
  const communitiesOfMunicipalityQuery = `*[_type == "community" && references($municipalityId)]{ ${CommunityDTOcoreQueryFields} }`;
  const communitiesOfMunicipalityQueryParams = {
    municipalityId: currentCommunity.municipality._id,
  };
  const communitiesOfMunicipality: CommunityExcerpt[] = await cdnClient
    .fetch(communitiesOfMunicipalityQuery, communitiesOfMunicipalityQueryParams)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response || [];
      return communityDtoList.map(communityDto => {
        return communityExcerptByDTO(communityDto);
      });
    })
    .catch(err => {
      console.warn(
        `The query to lookup communities of the same municipality '${currentCommunity.municipality._id}' at sanity failed:`
      );
      return null;
    });
  console.timeEnd('fetchCommunitiesInMunicipality');
  return communitiesOfMunicipality;
};

/**
 * Fetch communities nearby by geosearch, exclude the communities of the municipality
 */
const fetchCommunitiesNearby = async (currentCommunity: Community): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesNearby');

  const communitiesNearbyQuery = `*[_type == "community" && geo::distance(geolocation, $currentCommunityGeopoint) < 7500]{ ${CommunityDTOcoreQueryFields} }`;
  const communitiesNearbyQueryParams = {
    currentCommunityGeopoint: currentCommunity.geoLocation.point,
  };
  const communitiesNearby: CommunityExcerpt[] = await cdnClient
    .fetch(communitiesNearbyQuery, communitiesNearbyQueryParams)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response || [];
      return communityDtoList.map(communityDto => {
        return communityExcerptByDTO(communityDto);
      });
    })
    .catch(err => {
      console.warn(
        `The query to lookup communities nearby '${currentCommunity._id}' at sanity failed:`
      );
      return null;
    });
  console.timeEnd('fetchCommunitiesNearby');
  return communitiesNearby;
};

/**
 * Fetch communities in the broader region by geosearch, exclude the communities of the municipality and surrounding
 */
const fetchCommunitiesInRegion = async (
  currentCommunity: Community
): Promise<CommunityExcerpt[]> => {
  console.time('fetchCommunitiesInRegion');

  const communitiesRegionQuery = `*[_type == "community" && geo::distance(geolocation, $currentCommunityGeopoint) < 15000]{ ${CommunityDTOcoreQueryFields} }`;
  const communitiesRegionQueryParams = {
    currentCommunityGeopoint: currentCommunity.geoLocation.point,
  };
  const communitiesInRegion: CommunityExcerpt[] = await cdnClient
    .fetch(communitiesRegionQuery, communitiesRegionQueryParams)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response || [];
      return communityDtoList.map(communityDto => {
        return communityExcerptByDTO(communityDto);
      });
    })
    .catch(err => {
      console.warn(
        `The query to lookup communities in the region '${currentCommunity._id}' at sanity failed:`
      );
      return null;
    });
  console.timeEnd('fetchCommunitiesInRegion');
  return communitiesInRegion;
};

/**
 * fetch news for the municipality
 */
const fetchNews = async (municipalityId: string): Promise<News[]> => {
  console.time('fetchNews');

  const newsQuery = `*[_type == "news" && references($municipalityId)] | order(date desc) { ${NewsDTOteaserQueryFields}}`;
  const newsQueryParams = {
    municipalityId: municipalityId,
  };
  const news: News[] = await cdnClient
    .fetch(newsQuery, newsQueryParams)
    .then(response => {
      const newsDtoList: NewsDTO[] = response || [];
      return newsDtoList.map(newsDto => {
        return newsByDTO(newsDto);
      });
    })
    .catch(err => {
      console.warn(
        `The query to lookup news of the municipality '${municipalityId}' at sanity failed:`
      );
      return null;
    });
  console.timeEnd('fetchNews');
  return news;
};

/**
 * Get scope id list by scope identifier.
 * @param scope
 * @returns
 */
const scopeId = (scope: 'community' | 'municipality' | 'surrounding' | 'region'): number => {
  switch (scope) {
    case 'community':
      return 0;
    case 'municipality':
      return 1;
    case 'surrounding':
      return 2;
    case 'region':
      return 3;
    default:
      return 1;
  }
};

/**
 * Fetch events of all nearby communities with a scope adressing the surrounding or region.
 */
const fetchEventsByCommunityList = async (
  communityIdList: string[],
  scope: 'community' | 'municipality' | 'surrounding' | 'region'
): Promise<Event[]> => {
  console.time('fetchEventsByCommunityList-' + scope);
  if (communityIdList?.length <= 0) {
    console.error('communityIdList in fetchEventsByCommunityList missing or empty');
    return [];
  }

  // compose a query part to match all given communities
  const communitiesMatchQueryPart = communityIdList
    .map(function (cid) {
      return `references("${cid}")`;
    })
    .join(' || ')
    .trim();
  if (communitiesMatchQueryPart?.length <= 0) {
    console.error(
      'could not create a query part based on communityIdList in fetchEventsByCommunityList'
    );
    return [];
  }

  // compose a query part for the correct scopes
  const eventsScopeQueryPart: string = 'calendar->scope == "' + scopeId(scope).toString() + '"';
  const eventsQuery = `*[_type == "event" && (${communitiesMatchQueryPart}) && !cancelled && ${eventsScopeQueryPart}]{ ${EventDTOdetailQueryFields} }`;
  const eventsQueryParams = {};
  const events: Event[] = await cdnClient
    .fetch(eventsQuery, eventsQueryParams)
    .then(response => {
      const eventDtoList: EventDTO[] = response || [];
      return eventDtoList.map(eventDto => {
        return {
          ...eventByDTO(eventDto),
          distance: scope,
        };
      });
    })
    .catch(err => {
      console.error(
        `The query to lookup events based on a community id list '${communityIdList.join(
          ','
        )}' and the scope '${scope}' at sanity failed:`,
        eventsQuery
      );
      return [];
    });
  console.timeEnd('fetchEventsByCommunityList-' + scope);
  // console.debug(events);
  return events;
};

/**
 *
 * @param param0
 * @returns
 */
export const getStaticProps: GetStaticProps<IPageProps> = async ({ params }) => {
  console.time('dataFetching');
  const slug = join(params!.slug, '/');

  // fetch community data
  console.time('fetchCommunityData');
  const community: Community = await fetchCommunity(slug);
  if (!community) {
    return {
      notFound: true, // returns the default 404 page with a status code of 404
    };
  }
  let communitiesOfMunicipality: CommunityExcerpt[] = undefined;
  let communitiesNearby: CommunityExcerpt[] = undefined;
  let communitiesInRegion: CommunityExcerpt[] = undefined;
  [communitiesOfMunicipality, communitiesNearby, communitiesInRegion] = await Promise.all([
    fetchCommunitiesInMunicipality(community),
    fetchCommunitiesNearby(community),
    fetchCommunitiesInRegion(community),
  ]);
  console.timeEnd('fetchCommunityData');

  // fetch events
  console.time('fetchEventData');
  let communityEvents: Event[] = [];
  let municipalityEvents: Event[] = [];
  let nearbyEvents: Event[] = [];
  let regionEvents: Event[] = [];
  let news: News[] = [];

  [communityEvents, municipalityEvents, nearbyEvents, regionEvents, news] = await Promise.all([
    fetchEventsByCommunityList([community._id], 'community'),
    fetchEventsByCommunityList(
      communitiesOfMunicipality.map(c => c._id),
      'municipality'
    ),
    fetchEventsByCommunityList(
      communitiesNearby.map(c => c._id),
      'surrounding'
    ),
    fetchEventsByCommunityList(
      communitiesInRegion.map(c => c._id),
      'region'
    ),
    fetchNews(community.municipality._id),
  ]);

  // put everything together
  let events: Event[] = sortBy(
    communityEvents.concat(municipalityEvents, nearbyEvents, regionEvents),
    ['start', 'allday']
  );

  console.log(`Fetched ${events.length} events for community calendar '${community.slug}'.`);
  console.timeEnd('fetchEventData');

  // generate canonical url
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${community.slug}`
    : `https://${process.env.VERCEL_URL}/${community.slug}`;

  console.timeEnd('dataFetching');

  // TODO: Split up events in day chunky already in server side

  return {
    props: {
      meta: {
        canonicalUrl: canonicalUrl,
      },
      community: community,
      events: events,
      news: news,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * fetch all communities to create static pathes
   */
  let communityList: Community[] = new Array();
  await cdnClient
    .fetch(vorpommernGreifswaldCommunityListQuery)
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

  let paths = [];
  if (communityList)
    paths = communityList.map(community => {
      if (community.slug) return { params: { slug: [community.slug] } };
    });

  // add LeLe communities
  await cdnClient
    .fetch(leLeCommunityListQuery)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response;
      if (communityDtoList)
        communityList = communityList.concat(
          communityDtoList.map(communitytDto => {
            return communityByDTO(communitytDto);
          })
        );
    })
    .catch(err => {
      console.warn(`The query to lookup all communities at sanity failed:`);
    });

  // return { paths: paths, fallback: true };
  return { paths: [], fallback: true };
};

export default function Page(props: IPageProps) {
  const community: Community = props.community;
  const meta = props.meta;

  if (!community) return <>Dein Dorfterminkalender wird gerade geladen ...</>;

  const events: any = props.events;
  const news: News[] = props.news;
  const pageTitle = `${community.name} (Gemeinde ${community.municipality.name})`;

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>{pageTitle}</title>
          <meta
            name="description"
            content={`Wann ist wer wo in ${community.name}? Hier findest Du Termine und Neuigkeiten aus ${community.name} in der Gemeinde ${community.municipality.name}.`}
          />
          <meta
            name="keywords"
            content={`${community.name}, ${community.municipality.name}, Events, Termine, News, Veranstaltung, Lebensmittel, Müll, Bus`}
          />
          {community?.wikimediaCommonsImages?.length > 0 && (
            <meta property="og:image" content={community.wikimediaCommonsImages[0]} />
          )}
          <meta name="geo.region" content="DE-MV" />
          <meta
            name="geo.placename"
            content={`${community.name}, Gemeinde ${community.municipality.name}`}
          />
          {community?.geoLocation?.point?.lat && community?.geoLocation?.point?.lng && (
            <>
              <meta
                name="geo.position"
                content={`${community.geoLocation.point.lat};${community.geoLocation.point.lng}`}
              />
              <meta
                name="ICBM"
                content={`${community.geoLocation.point.lat},${community.geoLocation.point.lng}`}
              />
            </>
          )}
          <link rel="canonical" href={`${meta.canonicalUrl}`} />
          <meta property="og:url" content={`${meta.canonicalUrl}`}></meta>
          <meta httpEquiv="refresh" content="14400" />
          <meta httpEquiv="expires" content="14400" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if(typeof(_etracker) === "object") {
                et_eC_Wrapper({
                  et_et: '${process.env.NEXT_PUBLIC_ETRACKER_CODE}',
                  et_pagename: '${pageTitle}',
                  et_areas: 'Community',
                  et_seg1: '${community.municipality.name}',
                  _etr: { eoBlocked:true },
                });
              }
            `,
            }}
          />
        </Head>
        <CommunityHeader community={community} />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 lg:mx-4" key="pageSection">
          <div className="hidden print:block">
            <CommunityIntroPrint community={community} />
          </div>
          <div className="col-span-1 print:hidden">
            {news.length > 0 ? (
              <NewsArrangement>
                {community?.wikimediaCommonsImages?.length > 0 && (
                  <CommunityIntroAsNewsTeaserFormat community={community} key="communitySlide" />
                )}
                {news.map((newsItem, index) => (
                  <NewsTeaser newsItem={newsItem} key={`news${index}`} />
                ))}
              </NewsArrangement>
            ) : (
              <CommunityIntroWithoutNews community={community} key="communitySlide" />
            )}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Calendar
              start={new Date(new Date().setDate(new Date().getDate() + 1))}
              end={new Date(new Date().setDate(new Date().getDate() + 90))}
              events={events}
              key="eventList"
            />
          </div>
        </main>
      </div>
      <Footer community={community} />
    </>
  );
}
