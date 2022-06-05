import { FC, Fragment } from 'react';
import { calendarSheet, CalendarSheet } from '../../viewObjects/calendarSheet';
import { Event } from '../../entities/Event';
import { CalendarDisplayMode } from '../../entities/Calendar';
import CalendarDaySection from './CalendarDaySection';
import CalendarMonthSection from './CalendarMonthSection';
import OnelineEvents from '../EventDisplay/OnelineEvents';
import MicroEvent from '../EventDisplay/MicroEvent';
import EventTeaser from '../EventDisplay/EventTeaser';
import MiniEvent from '../EventDisplay/MiniEvent';
import OnelineCombinedEvents from '../EventDisplay/OnelineCombinedEvents';
import CommercialAdEvent from '../EventDisplay/CommercialAdEvent';
import EventList from '../EventDisplay/EventList';
import { isDynamicRoute } from 'next/dist/next-server/lib/router/utils';
import { filterEventsbyMonth } from '../../filter/filterEventsbyMonth';

export interface CalendarProps {
  start: Date;
  end: Date;
  events: any;
}

/**
 * Shows a visual header of a single commuity.
 */
const Calendar: FC<CalendarProps> = ({ start, end, events }) => {
  const myCalenderSheet: CalendarSheet = calendarSheet(start, end);

  return (
    <main key="CalendarMain" className="print:h-230mm print:w-190mm print:overflow-hidden">
      {myCalenderSheet.years.map(year => (
        <div key={`CalendarYearSection-${year.year}`} id={`CalendarYearSection-${year.year}`}>
          {year.months.map(month => {
            const eventsPerMonth: Event[] = filterEventsbyMonth(events, month);
            return (
              <CalendarMonthSection
                calendarMonth={month}
                key={`CalendarMonthSection-${month.localString}`}
                events={eventsPerMonth}
              ></CalendarMonthSection>
            );
          })}
        </div>
      ))}
    </main>
  );
};

export default Calendar;
