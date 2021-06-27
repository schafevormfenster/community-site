import { FC, ReactNode } from 'react';
import CalendarSheetIcon from './CalendarSheetIcon';

export interface CalendarDaySectionProps {
  day: Date;
  children: ReactNode;
}

/**
 * Shows a section with a special calendar sheet display at the left side.
 */
const CalendarDaySection: FC<CalendarDaySectionProps> = ({ day, children }) => {
  return (
    <section className="relative mb-4 pt-4 bg-gradient-to-b to-white from-gray-50 clear-both border-t border-gray-100">
      <div className="sticky top-4 w-12 mb-8 -ml-6 float-left">
        <CalendarSheetIcon day={day} />
      </div>
      <div className="ml-8 mr-0 pl-1 pr-2">{children}</div>
    </section>
  );
};

export default CalendarDaySection;
