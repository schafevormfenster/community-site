import React, { useState, useEffect, useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community } from '../src/entities/Community';
import { News } from '../src/entities/News';
import NewsTeaser from '../src/components/News/NewsTeaser';
import NewsArrangement from '../src/components/News/NewsArrangement';
import SanityClientConstructor from '@sanity/client';
import { first, last, join, split, sortBy, unionBy, filter, merge } from 'lodash';
import { Event } from '../src/entities/Event';
import FreshChat from 'react-freshchat';

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
}

export const getStaticProps: GetStaticProps<IPageProps> = async ({ params }) => {
  const slug = join(params!.slug, '/');

  console.log(slug);

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
  const query =
    '*[_type == "community" && slug.current == $slug]{ _id, slug, name, place_id, wikidata_id, wikimedia_commons_imagelinks, municipality->{_id, slug, name, place_id, twitter_user }}';
  const queryParams = {
    slug: slug,
  };

  let community: Community = undefined;

  // TODO: move fetching into a separate function
  await cdnClient
    .fetch(query, queryParams)
    .then(response => {
      const communityDto = first(response);
      // console.debug(communityDto);
      // TODO: move type mapping into a separate function, maybe just into the fetch function?
      community = {
        _id: communityDto._id,
        name: communityDto.name,
        slug: communityDto.slug.current,
        location: {
          identifiers: {
            geonamesId: last(split(communityDto._id, '.')),
            googlePlaceId: communityDto.place_id,
            wikidataId: communityDto.wikidata_id,
          },
        },
        wikimediaCommonsImages: communityDto.wikimedia_commons_imagelinks,
        municipality: {
          _id: communityDto.municipality._id,
          name: communityDto.municipality.name,
          slug: communityDto.municipality.slug.current,
          location: {
            identifiers: {
              geonamesId: last(split(communityDto.municipality._id, '.')),
              googlePlaceId: communityDto.municipality.place_id,
            },
          },
          socialMediaAccounts: {
            twitter: {
              user: communityDto.municipality.twitter_user,
            },
          },
        },
      };
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed:`);
    });

  /**
   * fetch all events for the given community incl. organizer and place
   */

  const eventQuery =
    '*[_type == "event" && references($communityId)]{ _id, name, start, location, community->{_id, slug, name }}';
  const eventQueryParams = {
    communityId: community._id,
  };

  // let events: Event[] = undefined;
  let events = [];

  // TODO: move fetching into a separate function and map properly to event type
  await cdnClient
    .fetch(eventQuery, eventQueryParams)
    .then(response => {
      events = response;
      // TODO: create a mapping from response to entity array
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed:`);
    });

  /**
   * TODO: Prio 1: fetch all events of communities of the same municipality but only with municipality scope
   */
  //let communitiesOfMunicipality: Community[] = undefined;

  /**
   * Fetch all other communities of the same municipality, to fetch events later on.
   */
  let communitiesOfMunicipality: any[] = undefined;
  // TODO: filter the current community right here in the query
  const communitiesOfMunicipalityQuery =
    '*[_type == "community" && _id != $currentCommuinityId && references($municipalityId)]{ _id, slug, name}';
  const communitiesOfMunicipalityQueryParams = {
    municipalityId: community.municipality._id,
    currentCommuinityId: community._id,
  };
  await cdnClient
    .fetch(communitiesOfMunicipalityQuery, communitiesOfMunicipalityQueryParams)
    .then(response => {
      communitiesOfMunicipality = response; // ensure union by id and sort by name

      console.log(communitiesOfMunicipality);
      // TODO: create a mapping from response to entity array
    })
    .catch(err => {
      console.warn(`The query to lookup the community '${slug}' reference for at sanity failed:`);
    });

  /**
   * Fetch events of all communities of the
   */
  const communitiesOfMunicipalityIdArray = communitiesOfMunicipality.map(c => {
    return c._id;
  });
  console.log(communitiesOfMunicipalityIdArray);

  await Promise.all(
    communitiesOfMunicipality.map(async c => {
      console.log('other community: ' + c.name);

      const municipalityEventsQuery =
        '*[_type == "event" && references($communityId) && !cancelled && calendar->scope in ["1", "2", "3"]][0..2]{ _id, name, start, location, community->{_id, slug, name }, calendar->{_id, name, scope}}';
      const municipalityEventsQueryParams = {
        communityId: c._id,
      };

      // TODO: move fetching into a separate function and map properly to event type
      await cdnClient
        .fetch(municipalityEventsQuery, municipalityEventsQueryParams)
        .then(response => {
          console.log(response);
          events = merge(events, response);

          // TODO: create a mapping from response to entity array
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
   * TODO: sort events by start date
   */
  events = sortBy(events, ['start']);

  return {
    props: {
      community: community,
      events: events,
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
  const events = props.events;

  const newsTeasers: News[] = [
    {
      abstract: 'Die Störche kommen.',
      image: 'https://pbs.twimg.com/media/E0caS5jX0AIcHN4?format=jpg&name=900x900',
      link:
        'https://twitter.com/GSchmatzin/status/1389107927152214017?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwgr%5EeyJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2hvcml6b25fdHdlZXRfZW1iZWRfOTU1NSI6eyJidWNrZXQiOiJodGUiLCJ2ZXJzaW9uIjpudWxsfX0%3D%7Ctwcon%5Etimelinechrome&ref_url=https%3A%2F%2Fschafe-vorm-fenster.de%2Fschlatkow%2F',
    },
    {
      abstract:
        'Die Gemeinde Schmatzin wünscht allen EinwohnerInnen ein frohes neues Jahr. In Mietshäusern sind nun Brandmelder Pflicht - aber auch für jedes Privathaus sind sie dringend zu empfehlen. Unsere Feuerwehr ist toll - aber jede Sekunde zählt.',
      image: null,
      link: 'https://twitter.com/GSchmatzin/status/1375109025281548289/photo/1',
    },
    {
      abstract: 'Endlich endlich. Unser Floß in #Schlatkow ist wieder im Wasser!',
      image: 'https://pbs.twimg.com/media/ExVeXMVXEAUPYHZ?format=jpg&name=900x900',
    },
    {
      abstract:
        'Diese Woche werden die neuen Klettergerüste in #Schlatkow aufgebaut. Danach ist noch einiges zu tun (Sand, Zaun, Geländer, ...) aber es geht vorwärts.',
      image: 'https://pbs.twimg.com/media/Eu_S8aIWgAQ_Mpa?format=jpg&name=900x900',
      link: 'https://twitter.com/GSchmatzin/status/1364541158614065156/photo/1',
    },
  ];

  return (
    <>
      <Head>
        <title> (Dorf)</title>
      </Head>
      <CommunityHeader community={community}></CommunityHeader>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <NewsArrangement>
            {newsTeasers.map((newsTeaser, index) => (
              <NewsTeaser
                abstract={newsTeaser.abstract}
                image={newsTeaser.image}
                link={newsTeaser.link}
                key={index}
              />
            ))}
          </NewsArrangement>
        </div>
        <div className="col-span-1">
          <h2>Termine</h2> <pre>{JSON.stringify(events, undefined, 2)}</pre>
        </div>
      </main>
      <footer className="bg-gray-700 text-white text-xs px-8 py-4">
        <pre>{JSON.stringify(community, undefined, 2)}</pre>
        <hr className="my-4" />
      </footer>
    </>
  );
}
