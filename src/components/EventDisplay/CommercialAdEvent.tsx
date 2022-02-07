import Interweave, { Markup } from 'interweave';
import moment from 'moment';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import {
  ClockIcon,
  SpeakerphoneIcon,
  PaperClipIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/outline';
import { Event as EventJsonLd, WithContext } from 'schema-dts';
import Head from 'next/head';
import LocationDisplay from './Elements/LocationDisplay';

export interface CommercialAdEventProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const CommercialAdEvent: FC<CommercialAdEventProps> = ({ event }) => {
  if (!event) return <></>;

  // get target url from description
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const targetUrl = event.description.match(urlRegex)[1];

  // plain text data
  const stripHtmlRegex = /<[^>]+>/g;

  return (
    <div className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0">
      {event?.attachment?.type === 'image' && (
        <p className="mt-2 mb-2 text-gray-700 print:text-black leading-none print:hidden">
          <a
            href={targetUrl}
            target="_blank"
            // onMouseDown={"_etracker.sendEvent(new et_UserDefinedEvent('Links.html', 'Links', 'Click', 'Link'));"}
          >
            <img
              className="w-full h-auto"
              src={event.attachment.url}
              alt={event.summary.replace(stripHtmlRegex, '')}
              title={event.description.replace(stripHtmlRegex, '')}
            />
          </a>
        </p>
      )}
      {event.calendar?.organizer?.name && (
        <p className="mt-2 mb-2 text-right text-sm text-gray-600 leading-none print:hidden">
          <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-gray-500" />
          <Markup content={event.calendar?.organizer?.name} noWrap />
          <PresentationChartLineIcon className="h-4 w-4 mb-0.5 inline-block ml-2 mr-1 text-gray-500" />
          <span className="mr-1">Anzeige</span>
        </p>
      )}
    </div>
  );
};

export default CommercialAdEvent;