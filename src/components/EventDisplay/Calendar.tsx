import { FC, Fragment } from 'react';
import { calendarSheet, CalendarSheet } from '../../viewObjects/calendarSheet';
import { Event } from '../../entities/Event';
import { CalendarDisplayMode } from '../../entities/Calendar';
import CalendarDaySection from './CalendarDaySection';
import CalendarMonthSection from './CalendarMonthSection';
import OnelineEvents from './OnelineEvents';
import MicroEvent from './MicroEvent';
import EventTeaser from './EventTeaser';
import MiniEvent from './MiniEvent';
import OnelineCombinedEvents from './OnelineCombinedEvents';
import CommercialAdEvent from './CommercialAdEvent';
import EventList from './EventList';
import { isDynamicRoute } from 'next/dist/next-server/lib/router/utils';

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
        <div key={`yearSection${year.year}`}>
          {year.months.map((month, monthIndex) => {
            return (
              <CalendarMonthSection
                month={new Date(month.year, month.month)}
                key={`monthSection${year.year}${monthIndex}`}
              >
                {month.days.map((day, dayIndex) => {
                  const iDay: string = new Date(day.year, day.month, day.day)
                    .toISOString()
                    .substring(0, 10);

                  // TODO: optimize filtering? maybe creat day based chunks in one stream? maybe measure first?
                  const thisDayEvents: Event[] = events
                    .filter(item => iDay == item.startDay)
                    .map(item => {
                      const mappedEvent: Event = {
                        ...item,
                        startDate: new Date(item.start),
                        endDate: new Date(item.end),
                      };
                      return mappedEvent;
                    });

                  const onelineEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.ONELINE) return item;
                  });

                  const onelineCombinedEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.ONELINECOMBINED)
                      return item;
                  });

                  const microEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.MICRO) return item;
                  });

                  const regularEvents: Event[] = thisDayEvents?.filter(item => {
                    if (
                      item.calendar.display_mode === CalendarDisplayMode.MINI ||
                      item.calendar.display_mode == CalendarDisplayMode.DEFAULT ||
                      item.calendar.display_mode == CalendarDisplayMode.EXTENDED
                    ) {
                      return item;
                    }
                  });

                  // reduce commercial event to one per organizer
                  let commercialOrganizerCounter = [];
                  const commercialEvents: Event[] = thisDayEvents?.filter(item => {
                    let adKey: string = iDay + '#' + item.calendar.organizer._id;
                    if (
                      !(commercialOrganizerCounter?.[adKey] === true) &&
                      item.calendar.display_mode === CalendarDisplayMode.AD
                    ) {
                      commercialOrganizerCounter[adKey] = true;
                      return item;
                    }
                  });

                  return (
                    <CalendarDaySection
                      day={new Date(iDay)}
                      key={`daySection${year.year}${monthIndex}${dayIndex}`}
                    >
                      {microEvents?.length > 0 &&
                        microEvents.map(microEvent => (
                          <MicroEvent event={microEvent} key={microEvent._id} />
                        ))}
                      {onelineEvents?.length > 0 && <OnelineEvents events={onelineEvents} />}
                      {onelineCombinedEvents?.length > 0 && (
                        <OnelineCombinedEvents events={onelineCombinedEvents} />
                      )}
                      {regularEvents?.length > 0 &&
                        regularEvents.map(regularEvent => (
                          <Fragment key={regularEvent._id}>
                            {regularEvent.calendar.display_mode == 'mini' ? (
                              <MiniEvent event={regularEvent} key={regularEvent._id} />
                            ) : (
                              <EventTeaser event={regularEvent} key={regularEvent._id} />
                            )}
                          </Fragment>
                        ))}
                      {commercialEvents?.length > 0 &&
                        commercialEvents.map(commercialEvent => (
                          <CommercialAdEvent event={commercialEvent} key={commercialEvent._id} />
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
