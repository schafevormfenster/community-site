import moment from 'moment';
import { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon } from '@heroicons/react/outline';

export interface OnelineEventsProps {
  events: Event[];
}

/**
 * Shows several events (mostly of the same kind) in one single line.
 */
const OnelineEvents: FC<OnelineEventsProps> = ({ events }) => {
  return (
    <div className="pb-2 whitespace-nowrap overflow-x-scroll">
      {events.map((event, index) => (
        <span className="mr-2" key={index}>
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
          {moment(event.start).format('HH:mm')} {event.summary}
        </span>
      ))}
    </div>
  );
};

export default OnelineEvents;
