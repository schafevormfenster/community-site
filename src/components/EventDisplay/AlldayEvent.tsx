import { FC } from 'react';
import { Event } from '../../entities/Event';

export interface AlldayEventProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const AlldayEvent: FC<AlldayEventProps> = ({ event }) => {
  if (!event) return <></>;
  return (
    <div className="pb-4 ">
      <p>
        {event.summary}
        {event.description && <span>{event.description}</span>}
      </p>
    </div>
  );
};

export default AlldayEvent;
