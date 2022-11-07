import { Markup } from 'interweave';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import { SpeakerphoneIcon, PresentationChartLineIcon } from '@heroicons/react/outline';
import GoogleDriveImage from '../Images/GoogleDriveImage';

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
  const targetUrl = event?.description?.match(urlRegex)[1];

  if (!targetUrl) return <></>;

  return (
    <div
      className="pt-2 pb-2 border-t border-gray-200 border-solid first:border-t-0"
      id={`CommercialAdEvent-${event._id}`}
    >
      {event?.attachment?.type === 'image' && (
        <p className="mt-0 mb-2 leading-none text-gray-700 print:text-black">
          <a
            href={targetUrl} // TODO: use targetUrl not google url
            target="_blank"
            // onMouseDown={"_etracker.sendEvent(new et_UserDefinedEvent('Links.html', 'Links', 'Click', 'Link'));"}
          >
            <GoogleDriveImage
              fileId={event.attachment.fileId}
              fileExt={event.attachment.fileExt}
              alt={event.summary}
              title={event.description}
            />
          </a>
        </p>
      )}
      {event.calendar?.organizer?.name && (
        <p className="mt-2 mb-2 text-sm leading-none text-right text-gray-600 print:text-black">
          <SpeakerphoneIcon className="h-4 w-4 mb-0.5 inline-block mr-1" />
          <Markup content={event.calendar?.organizer?.name} noWrap />
          <PresentationChartLineIcon className="h-4 w-4 mb-0.5 inline-block ml-2 mr-1" />
          <span className="mr-1">Anzeige</span>
        </p>
      )}
    </div>
  );
};

export default CommercialAdEvent;
