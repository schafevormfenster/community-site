import { Markup } from 'interweave';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';

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
  const targetUrl = event.description.match(urlRegex)[1];

  return (
    <div
      className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0"
      id={`CommercialAdEvent-${event._id}`}
    >
      {event?.attachment?.type === 'image' && (
        <p className="mt-0 mb-2 text-gray-700 print:text-black leading-none">
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
        <p className="mt-2 mb-2 text-right text-sm text-gray-600 print:text-black leading-none">
          <Markup content={event.calendar?.organizer?.name} noWrap />

          <span className="mr-1">Anzeige</span>
        </p>
      )}
    </div>
  );
};

export default CommercialAdEvent;
