import Interweave, { Markup } from 'interweave';
import moment from 'moment';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon, SpeakerphoneIcon, PaperClipIcon } from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';
import LocationDisplay from './Elements/LocationDisplay';

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
    <>
      <Head>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div className="pb-2 pt-2 border-t border-solid border-gray-200">
        {event.allday !== true ? (
          <p className="mb-1 text-gray-700 leading-none print:inline-block print:mr-4">
            <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            {moment(event.start).format('YYYY.MM.DD') != moment(event.end).format('YYYY.MM.DD') ? (
              <>
                {moment(event.start).format('DD.MM.YYYY HH:mm')} Uhr bis{' '}
                {moment(event.end).format('DD.MM.YYYY HH:mm')} Uhr
              </>
            ) : (
              <>
                {moment(event.start).format('HH:mm')} bis {moment(event.end).format('HH:mm')} Uhr
              </>
            )}
          </p>
        ) : (
          <>
            {moment(event.start).format('YYYY.MM.DD') != moment(event.end).format('YYYY.MM.DD') && (
              <p className="mb-1 text-gray-700 leading-none print:inline-block print:mr-2">
                <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
                <>
                  {moment(event.start).format('DD.MM.YYYY')} bis{' '}
                  {moment(event.end).format('DD.MM.YYYY')}
                </>
              </p>
            )}
          </>
        )}
        <p
          className="mb-2 text-gray-700 leading-none print:inline-block print:mb-1"
          title={event.location}
        >
          <LocationDisplay event={event} />
        </p>
        <h4 className="mb-2 font-semibold text-xl print:text-lg print:mb-0">
          <Markup content={event.summary} noWrap />
        </h4>
        {event?.attachment?.type === 'image' && (
          <p className="mt-2 mb-2 text-gray-700 leading-none print:hidden">
            <img className="w-full h-auto" src={event.attachment.url} alt={event.summary} />
          </p>
        )}
        {event.description && (
          <div className="prose max-h-60 overflow-y-scroll print:hidden">
            <Interweave
              content={event.description.replace(/^(<br>)*(.*?)( |<br>)*$/, '$2')}
              transform={(node, children) => {
                if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName.toLowerCase())) {
                  return <strong>{children}</strong>;
                }
              }}
            />
          </div>
        )}
        {event?.attachment?.type === 'download' && (
          <p className="mt-2 mb-2 text-gray-700 leading-none print:hidden">
            <a href={event.attachment.url} download target="_blank">
              <PaperClipIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
              <Markup content={event.attachment.title} noWrap />
            </a>
          </p>
        )}
        {event.calendar?.organizer?.name && (
          <p className="mt-2 mb-2 text-gray-700 leading-none print:hidden">
            <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
            <Markup content={event.calendar?.organizer?.name} noWrap />
          </p>
        )}
      </div>
    </>
  );
};

export default EventTeaser;
