import moment from 'moment';
import { FC } from 'react';
import { Event } from '../../entities/Event';

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
      <span title={event.description}>
        {moment(event.start).format('HH:mm')} Uhr {event.summary} (Location if != Community)
      </span>
    </div>
  );
};

export default MiniEvent;
