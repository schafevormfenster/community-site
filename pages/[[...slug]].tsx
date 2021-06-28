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
import { NewsDTO, NewsDTOteaserQueryFields, NewsDTOtypeName } from '../src/entityDTOs/NewsDTO';
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
}

export const getStaticProps: GetStaticProps<IPageProps> = async ({ params }) => {
  const slug = join(params!.slug, '/');

  // const { slug } = params as IParams;

  // use a cdn client for fetching data
  const cdnClient = SanityClientConstructor({
    apiVersion: process.env.SANITY_APIVERSION,
    projectId: process.env.SANITY_PROJECTID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: true,
  });

  /**
   * fetch community data incl. image and municipality
   */
  const query = `*[_type == "community" && slug.current == $slug]{ ${CommunityDTOdetailQueryFields} }`;
  const queryParams = {
    slug: slug,
  };

  let community: Community = undefined;

  // TODO: move fetching into a separate function
  await cdnClient
    .fetch(query, queryParams)
    .then(response => {
      const communityDto: CommunityDTO = first(response);
      community = communityByDTO(communityDto);
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed:`);
    });

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
  const eventQuery = `*[_type == "event" && references($communityId) && !cancelled]{ ${EventDTOdetailQueryFields} }`;
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
   * Fetch events of all these other communities with a scope higher than for the own community.
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
              return events.push(eventByDTO(eventDto));
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
   * TODO: Prio 2: fetch all events of communities nearby the current community but only with region scope
   * Option 1: add geopint to all events and directly lookup events
   *  - cons: depending on the distance some events of one community could be includes, others not which is not the intended result
   * Option 2: search for all communities within a specific geodistance and fetch all events of that communities
   *  - pros:
   *      - always includes all events of a village if its nearby
   *      - communities already have a geopint (at least in the base data, has to be added to sanity schema and imported)
   * https://www.sanity.io/docs/query-cheat-sheet#5a9dcaf4e63e
   */

  /**
   * TODO: union the events array
   */
  // events = unionBy(events, '_id');

  /**
   * Sort all collected events by start date.
   */
  events = sortBy(events, ['start', 'allday']);

  return {
    props: {
      community: community,
      events: events,
      news: news,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const arr: string[] = ['schlatkow', 'schmatzin', 'wolfradshof']
  // let paths = [];
  //  paths = arr.map((slug) => {

  //     return { params: { slug: slug } };
  // })
  // return { paths: paths, fallback: true };
  return { paths: [], fallback: true };
};

export default function Page(props: IPageProps) {
  // TODO: Dummy data, integrate with API
  const community: Community = props.community;

  if (!community) return <>404 no community</>;

  // const events: Event[] = props.events;
  const events: Event[] = props.events;
  const news: News[] = props.news;

  return (
    <>
      <Head>
        <title>
          {community.name} (Gemeinde {community.municipality.name})
        </title>
      </Head>
      <CommunityHeader community={community} />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 lg:mx-4">
        <div className="col-span-1">
          {news.length > 0 ? (
            <NewsArrangement>
              {community?.wikimediaCommonsImages?.length > 0 && (
                <CommunityIntroAsNewsTeaserFormat community={community} />
              )}
              {news.map((newsItem, index) => (
                <NewsTeaser newsItem={newsItem} key={index} />
              ))}
            </NewsArrangement>
          ) : (
            <CommunityIntroWithoutNews community={community}></CommunityIntroWithoutNews>
          )}
        </div>
        <div className="col-span-1 lg:col-span-2">
          <Calendar
            start={new Date(2021, 5, 21)}
            end={new Date(2021, 9, 0)}
            events={events}
          ></Calendar>
        </div>
      </main>
      {/*<footer className="bg-gray-700 text-white text-xs px-8 py-4">
        <pre>{JSON.stringify(community, undefined, 2)}</pre>
        <hr className="my-4" />
          </footer>*/}
    </>
  );
}
