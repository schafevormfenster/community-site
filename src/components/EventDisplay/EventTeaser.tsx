import Interweave from 'interweave';
import moment from 'moment';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import {
  LocationMarkerIcon,
  ClockIcon,
  SpeakerphoneIcon,
  PaperClipIcon,
} from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';

export interface EventTeaserProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const EventTeaser: FC<EventTeaserProps> = ({ event }) => {
  if (!event) return <></>;

  const jsonLd: WithContext<EventJsonLd> = {
    '@context': 'https://schema.org',
    '@type': 'SocialEvent',
    name: event.summary,
    description: event.description,
    startDate: event.start,
    endDate: event.end,
    location: {
      '@type': 'Place',
      name: event?.place?.name ? event.place.name : '',
      address: event?.location ? event.location : '',
    },
    organizer: event.calendar.organizer.longname
      ? event.calendar.organizer.longname
      : event.calendar.organizer.name,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="pb-2 pt-2 border-t border-solid border-gray-200">
        {event.allday !== true && (
          <p className="mb-1 text-gray-700 leading-none">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            {moment(event.start).format('HH:mm')} bis {moment(event.end).format('HH:mm')} Uhr
          </p>
        )}
        <p className="mb-2 text-gray-700 leading-none">
          <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
          {event.place?.localname}
        </p>
        <h4 className="mb-2 font-semibold text-xl">{event.summary}</h4>
        {event.description && (
          <div className="prose max-h-60 overflow-y-scroll">
            <Interweave content={event.description} />
          </div>
        )}
        {event?.attachment?.fileUrl && (
          <p className="mt-2 mb-2 text-gray-700 leading-none">
            <a href={event.attachment.fileUrl} download target="_blank">
              <PaperClipIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
              {event.attachment.title}
            </a>
          </p>
        )}
        {event.calendar?.organizer?.name && (
          <p className="mt-2 mb-2 text-gray-700 leading-none">
            <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            {event.calendar?.organizer?.name}
          </p>
        )}
      </div>
    </>
  );
};

export default EventTeaser;
