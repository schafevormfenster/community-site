import Interweave from 'interweave';
import moment from 'moment';
import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import { LocationMarkerIcon, ClockIcon } from '@heroicons/react/outline';

export interface EventTeaserProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const EventTeaser: FC<EventTeaserProps> = ({ event }) => {
  if (!event) return <></>;
  return (
    <div className="pb-4 pt-2 border-t border-solid border-gray-300">
      <p className="mb-1 leading-none">
        <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
        {moment(event.start).format('HH:mm')} bis {moment(event.end).format('HH:mm')} Uhr
      </p>
      <h5 className="mb-2 font-semibold text-2xl">{event.summary}</h5>
      {event.description && (
        <div className="mb-4">
          <Interweave content={event.description} />
        </div>
      )}
      <p className="mb-2 leading-none">
        <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
        {event.location}
      </p>
      {/*<pre>{JSON.stringify(event, undefined, 2)}</pre>*/}
    </div>
  );
};

export default EventTeaser;
