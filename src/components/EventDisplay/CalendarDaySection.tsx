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
    <section className="relative pt-4 border-gray-600 bg-gradient-to-b from-white to-gray-100">
      <div className="sticky top-4 w-12 mb-8 -ml-6">
        <CalendarSheetIcon day={day} />
      </div>
      <div className="ml-8 pl-2">{children}</div>
    </section>
  );
};

export default CalendarDaySection;
