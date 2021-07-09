import moment from 'moment';
import { FC } from 'react';
import { Event } from '../../entities/Event';
import { LocationMarkerIcon, ClockIcon } from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';

export interface MiniEventProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const MiniEvent: FC<MiniEventProps> = ({ event }) => {
  if (!event) return <></>;

  const jsonLd: WithContext<EventJsonLd> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.summary,
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
        <p className="mb-1 text-gray-700 leading-none">
          <span className="mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            {moment(event.start).format('HH:mm')} Uhr
          </span>
          <span className="mr-4">
            <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            {event.place?.localname}
          </span>
        </p>
        <h4 className="mb-2 font-semibold text-xl">{event.summary}</h4>
      </div>
    </>
  );
};

export default MiniEvent;
