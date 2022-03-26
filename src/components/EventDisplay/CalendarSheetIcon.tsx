import { FC } from 'react';
import { useIntl } from 'react-intl';

export interface CalendarSheetIconProps {
  day: Date;
}

/**
 * Shows a calendar sheet icon of a given date.
 */
const CalendarSheetIcon: FC<CalendarSheetIconProps> = ({ day }) => {
  const intl = useIntl();
  return (
    <div className="w-full bg-gray-400 text-white overflow-hidden rounded text-center leading-none print:bg-white print:text-black print:border-0">
      <span className="pt-0.5 block bg-gray-800 print:bg-white text-xs">
        {intl.formatDate(day, { weekday: 'short' })}
      </span>
      <span className="block pt-0.5 pb-1 print:pb-0 print:-my-1 text-3xl print:text-2xl font-bold leading-none">
        {day.getDate()}
      </span>
      <span className="hidden print:inline-block text-xs">
        {intl.formatDate(day, { month: 'long' })}
      </span>
    </div>
  );
};

export default CalendarSheetIcon;
