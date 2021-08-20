import { FC } from 'react';
import { calendarSheet, CalendarSheet } from '../../viewObjects/calendarSheet';
import { Event } from '../../entities/Event';
import { CalendarDisplayModeEnum } from '../../entities/Calendar';
import CalendarDaySection from './CalendarDaySection';
import CalendarMonthSection from './CalendarMonthSection';
import OnelineEvents from './OnelineEvents';
import MicroEvent from './MicroEvent';
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
    <main key="CalendarMain">
      {myCalenderSheet.years.map(year => (
        <div key={`yearSection${year.year}`}>
          {year.months.map((month, monthIndex) => {
            return (
              <CalendarMonthSection
                month={new Date(month.year, month.month)}
                key={`monthSection${year.year}${monthIndex}`}
              >
                {month.days.map((day, dayIndex) => {
                  const iDay = new Date(day.year, day.month, day.day);

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
                      item.calendar.display_mode != CalendarDisplayModeEnum.ONELINE &&
                      item.calendar.display_mode != CalendarDisplayModeEnum.MICRO
                    ) {
                      return item;
                    }
                  });

                  return (
                    <CalendarDaySection
                      day={iDay}
                      key={`daySection${year.year}${monthIndex}${dayIndex}`}
                    >
                      {microEvents.length > 0 &&
                        microEvents.map((microEvent, microEventIndex) => (
                          <MicroEvent event={microEvent} key={microEvent._id} />
                        ))}
                      {onelineEvents.length > 0 && <OnelineEvents events={onelineEvents} />}

                      {regularEvents.length > 0 &&
                        regularEvents.map((regularEvent, regularEventIndex) => (
                          <div key={regularEvent._id}>
                            {regularEvent.calendar.display_mode == 'mini' && (
                              <MiniEvent event={regularEvent} key={regularEvent._id} />
                            )}
                            {regularEvent.calendar.display_mode != 'mini' && (
                              <EventTeaser event={regularEvent} key={regularEvent._id} />
                            )}
                          </div>
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
