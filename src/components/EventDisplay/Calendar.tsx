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
import { sortBy } from 'lodash';
import CommercialAdEvent from './CommercialAdEvent';

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

  // TODO: filter always all events on every day and for every type costs much too much calculation time, maybe first sort events into a structured array/object once
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
                  const iDay = new Date(day.year, day.month, day.day);

                  const thisDayEvents: Event[] = sortBy(
                    events?.[day.year]?.[day.month]?.[day.day],
                    ['start', 'allday']
                  );

                  const onelineEvents: Event[] = thisDayEvents?.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayMode.ONELINE
                    )
                      return item;
                  });

                  const onelineCombinedEvents: Event[] = thisDayEvents?.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayMode.ONELINECOMBINED
                    )
                      return item;
                  });

                  const microEvents: Event[] = thisDayEvents?.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayMode.MICRO
                    )
                      return item;
                  });

                  const regularEvents: Event[] = thisDayEvents?.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );

                    if (
                      eventStartDay.getTime() === iDay.getTime() &&
                      (item.calendar.display_mode === CalendarDisplayMode.MINI ||
                        item.calendar.display_mode == CalendarDisplayMode.DEFAULT ||
                        item.calendar.display_mode == CalendarDisplayMode.EXTENDED)
                    ) {
                      return item;
                    }
                  });

                  // reduce commercial eventy to one per organizer
                  let commercialOrganizerCounter = [];
                  const commercialEvents: Event[] = thisDayEvents?.filter(item => {
                    const eventStartDate = new Date(item.start);
                    const eventStartDay = new Date(
                      eventStartDate.getFullYear(),
                      eventStartDate.getMonth(),
                      eventStartDate.getDate()
                    );
                    let adKey: string =
                      iDay.getTime().toString() + '#' + item.calendar.organizer._id;
                    if (
                      !(commercialOrganizerCounter?.[adKey] === true) &&
                      eventStartDay.getTime() === iDay.getTime() &&
                      item.calendar.display_mode === CalendarDisplayMode.AD
                    ) {
                      commercialOrganizerCounter[adKey] = true;
                      return item;
                    }
                  });

                  return (
                    <CalendarDaySection
                      day={iDay}
                      key={`daySection${year.year}${monthIndex}${dayIndex}`}
                    >
                      {microEvents?.length > 0 &&
                        microEvents.map((microEvent, microEventIndex) => (
                          <MicroEvent event={microEvent} key={microEvent._id} />
                        ))}
                      {onelineEvents?.length > 0 && <OnelineEvents events={onelineEvents} />}

                      {onelineCombinedEvents?.length > 0 && (
                        <OnelineCombinedEvents events={onelineCombinedEvents} />
                      )}

                      {regularEvents?.length > 0 &&
                        regularEvents.map((regularEvent, regularEventIndex) => (
                          <Fragment key={regularEventIndex}>
                            {regularEvent.calendar.display_mode == 'mini' && (
                              <MiniEvent event={regularEvent} key={regularEvent._id} />
                            )}
                            {regularEvent.calendar.display_mode != 'mini' && (
                              <EventTeaser event={regularEvent} key={regularEvent._id} />
                            )}
                          </Fragment>
                        ))}

                      {commercialEvents?.length > 0 &&
                        commercialEvents.map((commercialEvent, regularEventIndex) => (
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
