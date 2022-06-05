import React, { FC } from 'react';
import { Event } from '../../entities/Event';
import { CalendarDay } from '../../viewObjects/calendarSheet';
import CalendarSheetIcon from '../EventDisplay/CalendarSheetIcon';
import EventList from '../EventDisplay/EventList';

export interface CalendarDaySectionProps {
  calendarDay: CalendarDay;
  events: Event[];
}

/**
 * Shows a section with a special calendar sheet display at the left side.
 */
const CalendarDaySection: FC<CalendarDaySectionProps> = ({ calendarDay, events }) => {
  const itemCount = events.length;
  const dayAsDate: Date = new Date(calendarDay.year, calendarDay.month, calendarDay.day); // TODO: use local date by timezone
  return (
    <section
      id={`CalendarDaySection-${calendarDay.localString}`}
      className={`relative pt-4 bg-gradient-to-b to-white from-gray-50 clear-both border-t border-gray-100 print:pt-2 print:bg-white print:from-transparent print:to-transparent ${
        itemCount <= 0 && ' print:hidden'
      }`}
    >
      <div className="sticky top-4 w-12 mb-8 -ml-6 print:ml-0 print:mb-1 float-left">
        <CalendarSheetIcon day={dayAsDate} />
      </div>
      <div className="ml-8 mr-0 pl-1 pr-2 print:ml-14 print:pr-0">
        {itemCount > 0 ? (
          <EventList events={events} calendarDay={calendarDay} />
        ) : (
          <span className="block h-20 print:h-14"></span>
        )}
      </div>
    </section>
  );
};

export default CalendarDaySection;
