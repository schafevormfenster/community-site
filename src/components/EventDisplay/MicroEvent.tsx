import { FC } from 'react';
import { Event } from '../../entities/Event';

export interface MicroEventProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const MicroEvent: FC<MicroEventProps> = ({ event }) => {
  if (!event) return <></>;
  return (
    <div className="pb-2">
      <span title={event.description}>{event.summary}</span>
    </div>
  );
};

export default MicroEvent;
