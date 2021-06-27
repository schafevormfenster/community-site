import { FC, ReactNode } from 'react';
import moment from 'moment';

export interface CalendarMonthSectionProps {
  month: Date;
  children: ReactNode;
}

/**
 * Shows a section with a special sticky colored display of a month at the left side.
 */
const CalendarMonthSection: FC<CalendarMonthSectionProps> = ({ month, children }) => {
  return (
    <section className="relative">
      <div className="absolute top-0 -bottom-0 w-8 bg-secondary bg-gradient-to-b from-secondary to-secondaryDark ">
        <div className="sticky top-0 w-8 pt-20 mb-8">
          <i className="inline-block py-1 pl-1 w-8 text-vertical text-right transform rotate-180 text-white text-sm not-italic">
            {moment([month.getFullYear(), month.getMonth(), month.getDate(), 12]).format(
              'MMMM YYYY'
            )}
          </i>
        </div>
      </div>
      <div className="ml-8">{children}</div>
    </section>
  );
};

export default CalendarMonthSection;
