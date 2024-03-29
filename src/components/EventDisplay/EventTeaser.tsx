import Interweave, { Markup } from 'interweave';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon, SpeakerphoneIcon } from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';
import LocationDisplay from './Elements/LocationDisplay';
import GoogleDriveImage from '../Images/GoogleDriveImage';
import GoogleDriveFile from '../Images/GoogleDriveFile';
import { useIntl } from 'react-intl';
import { simplifyMarkup } from '../../transformer/simplifyMarkup';

export interface EventTeaserProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const EventTeaser: FC<EventTeaserProps> = ({ event }) => {
  const intl = useIntl();
  if (!event) return <></>;

  const date = new Date();
  const offset = date.getTimezoneOffset();

  const googleEventSummary: string = `${event.summary} - ${
    event?.placeName || event?.location
  } in ${event.community.name}`;

  const eventDescription: string = simplifyMarkup(event?.description);
  const startDate: Date = new Date(event.start);
  const endDate: Date = new Date(event.end);

  const jsonLd: WithContext<EventJsonLd> = {
    '@context': 'https://schema.org',
    '@type': 'SocialEvent',
    name: googleEventSummary,
    description: eventDescription,
    startDate: event.start,
    endDate: event.end,
    location: {
      '@type': 'Place',
      name: event?.placeName,
      address: event?.location,
      latitude: event?.geopoint?.lat,
      longitude: event?.geopoint?.lng,
    },
    organizer: event.calendar.organizer.longname
      ? event.calendar.organizer.longname
      : event.calendar.organizer.name,
  };

  return (
    <>
      <Head>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div
        id={'EventTeaser-' + event._id}
        className="pt-2 pb-2 border-t border-gray-200 border-solid first:border-t-0"
      >
        {event.allday !== true ? (
          <p className="mb-1 leading-none text-gray-700 print:text-black print:inline-block print:mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatDateTimeRange(startDate, endDate, {
              // day: '2-digit',
              // month: '2-digit',
              // year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : (
          <p className="mb-1 leading-none text-gray-700 print:inline-block print:mr-2">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatDateTimeRange(startDate, endDate, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        )}
        <p
          className="mb-2 leading-none text-gray-700 print:text-black print:inline-block print:mb-1"
          title={event.location}
        >
          <LocationDisplay event={event} />
        </p>
        <h4 className="mb-2 text-xl font-semibold print:text-base print:mb-0">
          <Markup content={event.summary} noWrap />
        </h4>
        {event?.attachment?.type === 'image' && (
          <p className="mt-2 mb-2 leading-none text-gray-700 print:text-black print:hidden">
            <GoogleDriveImage
              key={'GoogleDriveImage' + event._id}
              fileId={event.attachment.fileId}
              fileExt={event.attachment.fileExt}
              alt={event.summary}
              title={event.summary}
            />
          </p>
        )}
        {event.description && (
          <div className={`prose print:hidden`}>
            <Markup
              content={eventDescription}
              noWrap
              allowList={[
                'p',
                'strong',
                'b',
                'em',
                'i',
                'br',
                'img',
                'a',
                'ul',
                'ol',
                'li',
                'table',
                'tr',
                'th',
                'td',
              ]}
            />
          </div>
        )}
        {event?.attachment?.type === 'download' && (
          <p className="mt-2 mb-2 leading-none text-gray-700 print:hidden">
            <GoogleDriveFile
              fileId={event.attachment.fileId}
              fileExt={event.attachment.fileExt}
              fileName={event.attachment.title}
            />
          </p>
        )}
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

export default EventTeaser;
