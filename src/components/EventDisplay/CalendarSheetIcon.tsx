import { FC } from 'react';
import moment from 'moment';

export interface CalendarSheetIconProps {
  day: Date;
}

/**
 * Shows a calendar sheet icon of a given date.
 */
const CalendarSheetIcon: FC<CalendarSheetIconProps> = ({ day }) => {
  return (
    <div className="w-full bg-gray-400 text-white overflow-hidden rounded text-center leading-none print:bg-white print:text-black print:border-1 print:border-black print:rounded">
      <span className="pt-0.5 block bg-gray-800 print:bg-white text-xs">
        {moment(day).format('ddd')}
      </span>
      <span className="block pt-0.5 pb-1 print:pb-0 print:-my-1 text-3xl print:text-2xl font-bold leading-none">
        {moment(day).format('D')}
      </span>
      <span className="hidden print:inline-block text-xs">{moment(day).format('MMM')}</span>
    </div>
  );
};

export default CalendarSheetIcon;
