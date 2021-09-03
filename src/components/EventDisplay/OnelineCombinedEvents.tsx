import { FC } from 'react';
import { Event } from '../../entities/Event';
import TimeDisplay from './Elements/TimeDisplay';
import LocationDisplay from './Elements/LocationDisplay';

export interface OnelineCombinedEventsProps {
  events: Event[];
}

/**
 * Shows several events (mostly of the same kind) in one single line.
 */
const OnelineCombinedEvents: FC<OnelineCombinedEventsProps> = ({ events }) => {
  return (
    <div className="pb-2 whitespace-nowrap overflow-x-scroll">
      <span className="mr-2">{events[0].summary}</span>
      <LocationDisplay event={events[0]} />
      {events.map((event, index) => (
        <TimeDisplay event={event} />
      ))}
    </div>
  );
};

export default OnelineCombinedEvents;
