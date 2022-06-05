import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Event } from '../../entities/Event';
import { filterEventsbyDay } from '../../filter/filterEventsbyDay';
import { CalendarMonth } from '../../viewObjects/calendarSheet';
import CalendarDaySection from './CalendarDaySection';

export interface CalendarMonthSectionProps {
  calendarMonth: CalendarMonth;
  events: Event[];
}

/**
 * Shows a section with a special sticky colored display of a month at the left side.
 */
const CalendarMonthSection: FC<CalendarMonthSectionProps> = ({ calendarMonth, events }) => {
  const intl = useIntl();
  const monthAsDate: Date = new Date(calendarMonth.year, calendarMonth.month); // TODO: use local date by timezone
  return (
    <section className="relative" id={`CalendarMonthSection-${calendarMonth.localString}`}>
      <div className="absolute top-0 bottom-0 w-8 bg-secondary bg-gradient-to-b from-secondary to-secondaryDark print:bg-white print:from-transparent print:to-transparent">
        <div className="sticky top-0 w-8 pt-20 mb-8">
          <i className="inline-block py-1 pl-1 w-8 text-vertical text-right transform rotate-180 text-white text-sm not-italic print:hidden">
            {intl.formatDate(monthAsDate, { month: 'long', year: 'numeric' })}
          </i>
        </div>
      </div>
      <div className="ml-8 print:ml-0">
        {calendarMonth.days.map(day => {
          const eventsPerday: Event[] = filterEventsbyDay(events, day);
          return (
            <CalendarDaySection
              calendarDay={day}
              key={`CalendarDaySection-${day.localString}`}
              events={eventsPerday}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CalendarMonthSection;
