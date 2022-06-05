import { Markup } from 'interweave';
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
    event?.place ? event.place.localname || event.place.name : ''
  } in ${event.community.name}`;

  const eventDescription: string = simplifyMarkup(event?.description);

  const jsonLd: WithContext<EventJsonLd> = {
    '@context': 'https://schema.org',
    '@type': 'SocialEvent',
    name: googleEventSummary,
    description: eventDescription,
    startDate: event.start,
    endDate: event.end,
    location: {
      '@type': 'Place',
      name: event?.place?.name ? event.place.name : '',
      address: event?.place?.geoLocation?.address?.address
        ? event.place.geoLocation.address.address
        : event?.location,
      latitude: event?.place?.geoLocation?.point?.lat
        ? event.place.geoLocation.point.lat
        : undefined,
      longitude: event?.place?.geoLocation?.point?.lng
        ? event.place.geoLocation.point.lng
        : undefined,
    },
    organizer: event.calendar.organizer.longname
      ? event.calendar.organizer.longname
      : event.calendar.organizer.name,
  };

  return (
    <div>
      <Head>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div
        className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0"
        id={'EventTeaser-' + event._id}
        date-name={event.summary}
        data-timezone={offset}
      >
        {event.allday !== true ? (
          <p className="mb-1 text-gray-700 print:text-black leading-none print:inline-block print:mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatDateTimeRange(event.startDate, event.endDate, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : (
          <p className="mb-1 text-gray-700 leading-none print:inline-block print:mr-2">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            {intl.formatDateTimeRange(event.startDate, event.endDate, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        )}
        <p
          className="mb-2 text-gray-700 print:text-black leading-none print:inline-block print:mb-1"
          title={event.location}
        >
          <LocationDisplay event={event} />
        </p>
        <h4 className="mb-2 font-semibold text-xl print:text-base print:mb-0">
          <Markup content={event.summary} noWrap />
        </h4>
        {event?.attachment?.type === 'image' && (
          <p className="mt-2 mb-2 text-gray-700 print:text-black leading-none print:hidden">
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
            <Markup content={eventDescription} noWrap allowList={['p', 'br', 'img', 'a']} />
            {/* <Interweave
              content={event.description.replace(/^(<br>)*(.*?)( |<br>)*$/, '$2')}
              transform={(node, children) => {
                if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName.toLowerCase())) {
                  return <strong>{children}</strong>;
                }
              }}
            /> */}
          </div>
        )}
        {event?.attachment?.type === 'download' && (
          <p className="mt-2 mb-2 text-gray-700 leading-none print:hidden">
            <GoogleDriveFile
              fileId={event.attachment.fileId}
              fileExt={event.attachment.fileExt}
              fileName={event.attachment.title}
            />
          </p>
        )}
        {event.calendar?.organizer?.name && (
          <p className="mt-2 mb-2 text-gray-700 leading-none print:hidden">
            <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
            <Markup content={event.calendar?.organizer?.name} noWrap />
          </p>
        )}
      </div>
    </div>
  );
};

export default EventTeaser;
