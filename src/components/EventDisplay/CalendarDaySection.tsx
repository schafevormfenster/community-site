import React, { FC, ReactNode } from 'react';
import CalendarSheetIcon from './CalendarSheetIcon';

export interface CalendarDaySectionProps {
  day: Date;
  children: ReactNode;
}

/**
 * Shows a section with a special calendar sheet display at the left side.
 */
const CalendarDaySection: FC<CalendarDaySectionProps> = ({ day, children }) => {
  // console.time('CalendarDaySection');
  const itemCount = React.Children.toArray(children).length;
  const render = (
    <section
      className={`relative pt-4 bg-gradient-to-b to-white from-gray-50 clear-both border-t border-gray-100 print:pt-2 print:bg-white print:from-transparent print:to-transparent ${
        itemCount <= 0 && ' print:hidden'
      }`}
    >
      <div className="sticky top-4 w-12 mb-8 -ml-6 print:ml-0 print:mb-1 float-left">
        <CalendarSheetIcon day={day} />
      </div>
      <div className="ml-8 mr-0 pl-1 pr-2 print:ml-14 print:pr-0">
        {itemCount > 0 ? children : <span className="block h-20 print:h-14"></span>}
      </div>
    </section>
  );
  // console.timeEnd('CalendarDaySection');
  return render;
};

export default CalendarDaySection;
