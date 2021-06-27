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
        <div>
          {year.months.map(month => {
            const monthString = moment([month.year, month.month, 12]).format('MMMM YYYY');
            return (
              <div>
                <CalendarMonthSection month={new Date(month.year, month.month)}>
                  {month.days.map(day => {
                    const iDay = new Date(day.year, day.month, day.day);
                    const dayString = moment([day.year, day.month, day.day, 12]).format(
                      'DD.MM.YYYY'
                    );

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
                      <CalendarDaySection day={iDay}>
                        {microEvents.length > 0 &&
                          microEvents.map(event => <MicroEvent event={event} />)}

                        {onelineEvents.length > 0 && <OnelineEvents events={onelineEvents} />}

                        {allDayEvents.length > 0 &&
                          allDayEvents.map(event => <AlldayEvent event={event} />)}

                        {regularEvents.length > 0 &&
                          regularEvents.map(event => (
                            <>
                              {event.calendar.display_mode == 'mini' && <MiniEvent event={event} />}
                              {event.calendar.display_mode != 'mini' && (
                                <EventTeaser event={event} />
                              )}
                            </>
                          ))}
                      </CalendarDaySection>
                    );
                  })}
                </CalendarMonthSection>
              </div>
            );
          })}
        </div>
      ))}
    </main>
  );
};

export default Calendar;
