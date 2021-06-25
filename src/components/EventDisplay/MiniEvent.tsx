import moment from 'moment';
import { FC } from 'react';
import { Event } from '../../entities/Event';
import { LocationMarkerIcon, ClockIcon } from '@heroicons/react/outline';

export interface MiniEventProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const MiniEvent: FC<MiniEventProps> = ({ event }) => {
  if (!event) return <></>;
  return (
    <div className="pb-4 pt-2 border-t border-solid border-gray-300">
      <p className="mb-1 text-gray-700 leading-none">
        <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
        {moment(event.start).format('HH:mm')} Uhr &nbsp;
        <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
        {event.place?.localname}
      </p>
      <h6 className="mb-2 font-semibold text-xl">{event.summary}</h6>
    </div>
  );
};

export default MiniEvent;
