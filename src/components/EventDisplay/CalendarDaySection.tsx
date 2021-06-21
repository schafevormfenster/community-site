import { FC, ReactNode } from 'react';
import moment from 'moment';

export interface CalendarDaySectionProps {
  day: Date;
  children: ReactNode;
}

/**
 * Shows a visual header of a single commuity.
 */
const CalendarDaySection: FC<CalendarDaySectionProps> = ({ day, children }) => {
  const dayString = moment([day.getFullYear(), day.getMonth(), day.getDate(), 12]).format(
    'DD.MM.YYYY'
  );
  return (
    <section className="relative border-gray-600 bg-yellow-200">
      <div className="absolute  h-full w-8 bg-red-400">
        <i className="absolute top-1/2 left-1/2 transform -rotate-90 -translate-x-1/2 -translate-y-1/2">
          {dayString}
        </i>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default CalendarDaySection;
