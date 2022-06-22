import { FC } from 'react';
import { Event } from '../../entities/Event';
import { ClockIcon, HomeIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { Markup } from 'interweave';
import { useIntl } from 'react-intl';

export interface OpeningHoursProps {
  event: Event;
}

/**
 * Shows one event in one single line with less information.
 */
const OpeningHours: FC<OpeningHoursProps> = ({ event }) => {
  const intl = useIntl();
  if (!event) return <></>;

  const startDate: Date = new Date(event.start);
  const endDate: Date = new Date(event.end);
  const eventLocation: string = event.location
    .replace(`${event.summary},`, '')
    .replace(', Deutschland', '')
    .trim();

  return (
    <div
      className="pb-2 pt-2 border-t border-solid border-gray-200 first:border-t-0 whitespace-nowrap overflow-x-scroll print:overflow-hidden"
      id={event._id}
    >
      <p className="mb-1 text-gray-700 print:text-black leading-none">
        <span className="mr-4">
          <HomeIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
          <Markup content={event.summary} noWrap />
        </span>
        <span className="mr-4">
          <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
          {intl.formatDateTimeRange(startDate, endDate, {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          geöffnet
        </span>
        <span className="mr-4">
          <LocationMarkerIcon className="h-4 w-4 mb-0.5 inline-block mr-1 text-secondary print:text-black" />
          <Markup content={eventLocation} noWrap />
        </span>
      </p>
    </div>
  );
};

export default OpeningHours;
