import { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon, SpeakerphoneIcon } from '@heroicons/react/outline';
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
      name: event?.placeName || '',
      address: event?.location || '',
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
        className="pt-2 pb-2 border-t border-gray-200 border-solid first:border-t-0"
        id={event._id}
      >
        <p className="mb-1 leading-none text-gray-700 print:text-black">
          <span className="mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatTime(event.start, { hour: '2-digit', minute: '2-digit' })} Uhr
          </span>
          <span className="mr-4">
            <LocationDisplay event={event} />
          </span>
        </p>
        <h4 className="mb-2 text-xl font-semibold print:text-base print:mb-0">
          <Markup content={event.summary} noWrap />
        </h4>
        {event.calendar?.organizer?.name && (
          <p className="mt-2 mb-2 leading-none text-gray-700 print:hidden">
            <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            <Markup content={event.calendar?.organizer?.name} noWrap />
          </p>
        )}
      </div>
    </>
  );
};

export default MiniEvent;
