import { FC } from 'react';
import moment from 'moment';
import { calendarSheet, CalendarSheet } from '../../viewObjects/calendarSheet';
import { Event } from '../../entities/Event';
import { CalendarDisplayModeEnum } from '../../entities/Calendar';
import CalendarDaySection from './CalendarDaySection';
import CalendarMonthSection from './CalendarMonthSection';

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
                        <h5>micro:</h5>
                        <pre>{JSON.stringify(microEvents, undefined, 2)}</pre>
                        <h5>oneline:</h5>
                        <pre>{JSON.stringify(onelineEvents, undefined, 2)}</pre>
                        <h5>allday:</h5>
                        <pre>{JSON.stringify(allDayEvents, undefined, 2)}</pre>
                        <h5>regular:</h5>
                        <pre>{JSON.stringify(regularEvents, undefined, 2)}</pre>
                      </CalendarDaySection>
                    );
                  })}
                </CalendarMonthSection>
              </div>
            );
          })}
        </div>
      ))}

      <pre>{JSON.stringify(myCalenderSheet, undefined, 2)}</pre>
    </main>
  );
};

export default Calendar;
