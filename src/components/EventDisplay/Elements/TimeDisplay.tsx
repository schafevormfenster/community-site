import React, { FC } from 'react';
import { Event } from '../../../entities/Event';
import { ClockIcon } from '@heroicons/react/outline';
import { CalendarTimeDisplayMode } from '../../../entities/Calendar';
import { useIntl } from 'react-intl';

export interface TimeDisplayProps {
  event: Event;
}

/**
 * Shows one event with all relevant data.
 */
const TimeDisplay: FC<TimeDisplayProps> = ({ event }) => {
  const intl = useIntl();
  if (!event) return <></>;
  const startDate: Date = new Date(event.start);
  const endDate: Date = new Date(event.end);
  return (
    <>
      {event.calendar.time_display_mode === CalendarTimeDisplayMode.StartTimeOnly && (
        <span className="mr-2">
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
          {intl.formatTime(startDate, { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
      {event.calendar.time_display_mode === CalendarTimeDisplayMode.StartAndEndTime && (
        <span className="mr-2">
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
          {intl.formatDateTimeRange(startDate, endDate, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )}
    </>
  );
};

export default TimeDisplay;
