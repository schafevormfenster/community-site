import { FC } from 'react';
import moment from 'moment';
import { calendarSheet, CalendarSheet } from '../../viewObjects/calendarSheet';
import { Event } from '../../entities/Event';
import { CalendarDisplayModeEnum } from '../../entities/Calendar';
import CalendarDaySection from './CalendarDaySection';
import CalendarMonthSection from './CalendarMonthSection';
import OnelineEvents from './OnelineEvents';
import MicroEvent from './MicroEvent';
import AlldayEvent from './AlldayEvent';
import EventTeaser from './EventTeaser';
import MiniEvent from './MiniEvent';

export interface CalendarProps {
  start: Date;
  end: Date;
  events: Event[];
}

/**
 * Shows a visual header of a single commuity.
 */
const Calendar: FC<CalendarProps> = ({ start, end, events }) => {
  const myCalenderSheet: CalendarSheet = calendarSheet(start, end);

  return (
    <main>
      {myCalenderSheet.years.map(year => (
        <div key={year.year}>
          {year.months.map((month, monthIndex) => {
            return (
              <CalendarMonthSection
                month={new Date(month.year, month.month)}
                key={`monthSection${monthIndex}`}
              >
                {month.days.map((day, dayIndex) => {
                  const iDay = new Date(day.year, day.month, day.day);

                  const allDayEvents: Event[] = events.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (eventStartDay.getTime() === iDay.getTime() && item.allday === true)
                      return item;
                  });

                  const onelineEvents: Event[] = events.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayModeEnum.ONELINE
                    )
                      return item;
                  });

                  const microEvents: Event[] = events.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayModeEnum.MICRO
                    )
                      return item;
                  });

                  const regularEvents: Event[] = events.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );

                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.allday === false &&
                      item.calendar.display_mode != CalendarDisplayModeEnum.ONELINE &&
                      item.calendar.display_mode != CalendarDisplayModeEnum.MICRO
                    )
                      return item;
                  });

                  return (
                    <CalendarDaySection day={iDay} key={`daySection${dayIndex}`}>
                      {microEvents.length > 0 &&
                        microEvents.map((microEvent, microEventIndex) => (
                          <MicroEvent event={microEvent} key={microEventIndex} />
                        ))}

                      {onelineEvents.length > 0 && <OnelineEvents events={onelineEvents} />}

                      {allDayEvents.length > 0 &&
                        allDayEvents.map((allDayEvent, allDayEventIndex) => (
                          <AlldayEvent event={allDayEvent} key={allDayEventIndex} />
                        ))}

                      {regularEvents.length > 0 &&
                        regularEvents.map((regularEvent, regularEventIndex) => (
                          <>
                            {regularEvent.calendar.display_mode == 'mini' && (
                              <MiniEvent event={regularEvent} key={regularEventIndex} />
                            )}
                            {regularEvent.calendar.display_mode != 'mini' && (
                              <EventTeaser event={regularEvent} key={regularEventIndex} />
                            )}
                          </>
                        ))}
                    </CalendarDaySection>
                  );
                })}
              </CalendarMonthSection>
            );
          })}
        </div>
      ))}
    </main>
  );
};

export default Calendar;
