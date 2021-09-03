import React, { FC } from 'react';
import { Event } from '../../../entities/Event';
import { ClockIcon } from '@heroicons/react/outline';
import { CalendarTimeDisplayMode } from '../../../entities/Calendar';
import moment from 'moment';

export interface TimeDisplayProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const TimeDisplay: FC<TimeDisplayProps> = ({ event }) => {
  if (!event) return <></>;

  return (
    <>
      {event.calendar.time_display_mode === CalendarTimeDisplayMode.StartTimeOnly && (
        <span className="mr-2">
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
          {moment(event.start).format('HH:mm')}
        </span>
      )}
      {event.calendar.time_display_mode === CalendarTimeDisplayMode.StartAndEndTime && (
        <span className="mr-2">
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary" />
          {moment(event.start).format('HH:mm')}-{moment(event.end).format('HH:mm')}
        </span>
      )}
    </>
  );
};

export default TimeDisplay;
