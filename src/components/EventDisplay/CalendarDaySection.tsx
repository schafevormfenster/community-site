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
    <section className="relative mb-4 border-gray-600 bg-gradient-to-b from-white to-gray-100 clear-both">
      <div className="sticky top-4 w-12 mb-8 -ml-6 float-left">
        <CalendarSheetIcon day={day} />
      </div>
      <div className="ml-8 mr-0 pl-2 pr-4">{children}</div>
    </section>
  );
};

export default CalendarDaySection;
