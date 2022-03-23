import { FC } from 'react';
import { Event } from '../../entities/Event';
import TimeDisplay from './Elements/TimeDisplay';

export interface OnelineEventsProps {
  events: Event[];
}

/**
 * Shows several events (mostly of the same kind) in one single line.
 */
const OnelineEvents: FC<OnelineEventsProps> = ({ events }) => {
  return (
    <div className="pb-2 whitespace-nowrap overflow-x-scroll print:overflow-hidden">
      {events.map((event, index) => (
        <span key={index}>
          <TimeDisplay event={event} />
          <span className="mr-2">{event.summary}</span>
        </span>
      ))}
    </div>
  );
};

export default OnelineEvents;
