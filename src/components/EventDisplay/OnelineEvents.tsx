import moment from 'moment';
import { FC } from 'react';
import { Event } from '../../entities/Event';

export interface OnelineEventsProps {
  events: Event[];
}

/**
 * Shows several events (mostly of the same kind) in one single line.
 */
const OnelineEvents: FC<OnelineEventsProps> = ({ events }) => {
  return (
    <div className="pb-4 whitespace-nowrap overflow-x-scroll">
      {events.map(event => (
        <span className="mr-2">
          {moment(event.start).format('HH:mm')} {event.summary}
        </span>
      ))}
    </div>
  );
};

export default OnelineEvents;
