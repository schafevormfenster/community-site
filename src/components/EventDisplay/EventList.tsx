import { FC } from 'react';
import { Event } from '../../entities/Event';

export interface EventListProps {
  events: Event[];
}

/**
 * Shows one event in one single line with less information.
 */
const EventList: FC<EventListProps> = ({ events }) => {
  if (events?.length <= 0) return null;
  return (
    <div className="pb-2">
      <pre>
        EventList / events:
        {JSON.stringify(events, null, 2)}
      </pre>
    </div>
  );
};

export default EventList;
