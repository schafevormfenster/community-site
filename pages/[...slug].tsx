import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community, CommunityExcerpt } from '../src/entities/Community';
import { News } from '../src/entities/News';
import NewsTeaser from '../src/components/News/NewsTeaser';
import NewsArrangement from '../src/components/News/NewsArrangement';
import SanityClientConstructor from '@sanity/client';
import { first, join, sortBy } from 'lodash';
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

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? 'is-selected' : ''}`}
    type="button"
    onClick={onClick}
  />
);

interface IParams extends ParsedUrlQuery {
  slug: string;
}

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
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<IPageProps> = async ({ params }) => {
  const slug = join(params!.slug, '/');

  // const { slug } = params as IParams;

  /**
   * fetch community data incl. image and municipality
   */
  const query = `*[_type == "community" && slug.current == $slug]{ ${CommunityDTOdetailQueryFields} }`;
  const queryParams = {
    slug: slug,
  };

  let communitiesInMunicipality = [];
  let communitiesInNearbySurrounding = [];

  let community: Community = undefined;

  // TODO: move fetching into a separate function
  await cdnClient
    .fetch(query, queryParams)
    .then(response => {
      const communityDto: CommunityDTO = first(response);
      communitiesInMunicipality.push(communityDto._id);
      community = communityByDTO(communityDto);
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed:`);
    });

  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${community.slug}`
    : `https://${process.env.VERCEL_URL}/${community.slug}`;

  /**
   * fetch news for the municipality
   */
  let news: News[] = []; // init events array with proper type
  const newsQuery = `*[_type == "news" && references($municipalityId)] | order(date desc) { ${NewsDTOteaserQueryFields}}`;
  const newsQueryParams = {
    municipalityId: community.municipality._id,
  };
  await cdnClient
    .fetch(newsQuery, newsQueryParams)
    .then(response => {
      const newsDtoList: NewsDTO[] = response;
      if (newsDtoList)
        news = newsDtoList.map(newsDto => {
          return newsByDTO(newsDto);
        });
    })
    .catch(err => {
      console.warn(
        `The query to lookup events of the community '${community._id}' at sanity failed:`
      );
    });

  /**
   * fetch all events for the given community incl. organizer and place
   */
  let events: Event[] = []; // init events array with proper type
  const eventQuery = `*[_type == "event" && references($communityId) && !cancelled] | order(start asc){ ${EventDTOdetailQueryFields} }`;
  const eventQueryParams = {
    communityId: community._id,
  };
  await cdnClient
    .fetch(eventQuery, eventQueryParams)
    .then(response => {
      const eventDtoList: EventDTO[] = response;
      if (eventDtoList)
        eventDtoList.map(eventDto => {
          return events.push(eventByDTO(eventDto));
        });
    })
    .catch(err => {
      console.warn(
        `The query to lookup events of the community '${community._id}' at sanity failed:`
      );
    });

  /**
   * Fetch all other communities of the same municipality, exclude the current one.
   */
  let communitiesOfMunicipality: CommunityExcerpt[] = undefined;
  const communitiesOfMunicipalityQuery = `*[_type == "community" && _id != $currentCommuinityId && references($municipalityId)]{ ${CommunityDTOcoreQueryFields} }`;
  const communitiesOfMunicipalityQueryParams = {
    municipalityId: community.municipality._id,
    currentCommuinityId: community._id,
  };
  await cdnClient
    .fetch(communitiesOfMunicipalityQuery, communitiesOfMunicipalityQueryParams)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response;
      communitiesOfMunicipality = communityDtoList
        ? communityDtoList.map(communityDto => {
            communitiesInMunicipality.push(communityDto._id);
            return communityExcerptByDTO(communityDto);
          })
        : undefined;
    })
    .catch(err => {
      console.warn(
        `The query to lookup communities of the same municipality '${community.municipality._id}' at sanity failed:`
      );
    });

  /**
   * Fetch events of all communities of the municipality with a scope higher than for the own community.
   */
  await Promise.all(
    communitiesOfMunicipality.map(async c => {
      const municipalityEventsQuery = `*[_type == "event" && references($communityId) && !cancelled && calendar->scope in ["1", "2", "3"]]{ ${EventDTOdetailQueryFields} }`;
      const municipalityEventsQueryParams = {
        communityId: c._id,
      };
      await cdnClient
        .fetch(municipalityEventsQuery, municipalityEventsQueryParams)
        .then(response => {
          const municipalityEventDtoList: EventDTO[] = response;
          if (municipalityEventDtoList)
            municipalityEventDtoList.map(eventDto => {
              let municipalityEvent = eventByDTO(eventDto);
              municipalityEvent.distance = 'municipality';
              return events.push(municipalityEvent);
            });
        })
        .catch(err => {
          console.warn(
            `The query to lookup the community '${slug}' reference for at sanity failed:`
          );
        });
    })
  );

  /**
   * Fetch communities nearby by geosearch, exclude the communities of the municipality
   */
  const communitiesExcludeQueryPart = communitiesInMunicipality
    .map(function (cid) {
      return ` && _id != "${cid}"`;
    })
    .join('');
  let communitiesNearby: CommunityExcerpt[] = undefined;
  const communitiesNearbyQuery = `*[_type == "community" && geo::distance(geolocation, $currentCommunityGeopoint) < 6000 ${communitiesExcludeQueryPart}]{ ${CommunityDTOcoreQueryFields} }`;
  const communitiesNearbyQueryParams = {
    municipalityId: community.municipality._id,
    currentCommuinityId: community._id,
    currentCommunityGeopoint: community.geoLocation.point,
  };
  await cdnClient
    .fetch(communitiesNearbyQuery, communitiesNearbyQueryParams)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response;
      communitiesNearby = communityDtoList
        ? communityDtoList.map(communityDto => {
            communitiesInNearbySurrounding.push(communityDto._id);
            return communityExcerptByDTO(communityDto);
          })
        : undefined;
    })
    .catch(err => {
      console.warn(`The query to lookup communities nearby '${community.name}' at sanity failed:`);
    });

  /**
   * Fetch events of all nearby communities with a scope adressing the surrounding or region.
   */
  const communitiesMatchQueryPart = communitiesInNearbySurrounding
    .map(function (cid) {
      return `references("${cid}")`;
    })
    .join(' || ');
  const communitiesMatchQueryPartWrapped =
    communitiesMatchQueryPart.trim().length > 0 ? '&& (' + communitiesMatchQueryPart + ')' : '';
  const nearbyEventsQuery = `*[_type == "event" ${communitiesMatchQueryPartWrapped} && !cancelled && calendar->scope in ["2", "3"]]{ ${EventDTOdetailQueryFields} }`;
  const nearbyEventsQueryParams = {};
  await cdnClient
    .fetch(nearbyEventsQuery, nearbyEventsQueryParams)
    .then(response => {
      const nearbyEventDtoList: EventDTO[] = response;
      if (nearbyEventDtoList)
        nearbyEventDtoList.map(eventDto => {
          let surroundingEvent = eventByDTO(eventDto);
          surroundingEvent.distance = 'surrounding';
          return events.push(surroundingEvent);
        });
    })
    .catch(err => {
      console.warn(
        `The query to lookup eventy in the nearby surrounding of the community '${slug}' at sanity failed:`,
        nearbyEventsQuery
      );
    });

  /**
   * Sort all collected events by start date.
   */
  events = sortBy(events, ['start', 'allday']);

  return {
    props: {
      meta: {
        canonicalUrl: canonicalUrl,
      },
      community: community,
      events: events,
      news: news,
    },
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * fetch all communities to create static pathes
   */
  const communityListQuery = `*[_type == "community" && slug.current!='']{ ${CommunityDTOcoreQueryFields} }`;
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

  let paths = [];
  if (communityList)
    paths = communityList.map(community => {
      if (community.slug) return { params: { slug: [community.slug] } };
    });
  return { paths: paths, fallback: true };
  //return { paths: [], fallback: true };
};

export default function Page(props: IPageProps) {
  // TODO: Dummy data, integrate with API
  const community: Community = props.community;
  const meta = props.meta;

  if (!community) return <>404 no community</>;

  // const events: Event[] = props.events;
  const events: Event[] = props.events;
  const news: News[] = props.news;
  const pageTitle = `${community.name} (Gemeinde ${community.municipality.name})`;

  return (
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
        <div className="col-span-1">
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
            start={new Date()}
            end={new Date(new Date().setDate(new Date().getDate() + 90))}
            events={events}
            key="eventList"
          />
        </div>
      </main>
    </div>
  );
}
