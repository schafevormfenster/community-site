import { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon } from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';
import LocationDisplay from './Elements/LocationDisplay';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

export interface MiniEventProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const MiniEvent: FC<MiniEventProps> = ({ event }) => {
  const intl = useIntl();
  if (!event) return <></>;

  const startTime: string =
    intl.formatTime(event.start, { hour: '2-digit', minute: '2-digit' }) + ' Uhr';

  const jsonLd: WithContext<EventJsonLd> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.summary + ', ' + startTime,
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
      <div
        className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0"
        id={event._id}
      >
        <p className="mb-1 text-gray-700 print:text-black leading-none">
          <span className="mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatTime(event.start, { hour: '2-digit', minute: '2-digit' })} Uhr
          </span>
          <span className="mr-4">
            <LocationDisplay event={event} />
          </span>
        </p>
        <h4 className="mb-2 font-semibold text-xl print:text-base print:mb-0">
          <Markup content={event.summary} noWrap />
        </h4>
      </div>
    </>
  );
};

export default MiniEvent;
