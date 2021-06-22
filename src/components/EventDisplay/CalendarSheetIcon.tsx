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
    <div className="w-full bg-gray-400 text-white overflow-hidden rounded text-center leading-none">
      <span className="pt-0.5 block bg-gray-800 text-xs">{moment(day).format('ddd')}</span>
      <span className="block pt-0.5 pb-1 text-3xl font-bold leading-none">
        {moment(day).format('D')}
      </span>
      {/*<span className=" block text-xs">{moment(day).format('MMM')}</span>*/}
    </div>
  );
};

export default CalendarSheetIcon;
