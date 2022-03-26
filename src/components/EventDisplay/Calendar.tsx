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
      All Events:
      <pre>{events.length} events</pre>
      {myCalenderSheet.years.map(year => (
        <div key={`yearSection${year.year}`}>
          {year.months.map((month, mi) => (
            <pre key={mi} className="relative  bg-red-600">
              {JSON.stringify(month.year, null, 2)} {JSON.stringify(month.month, null, 2)}
            </pre>
          ))}

          {year.months.map((month, monthIndex) => {
            return (
              <CalendarMonthSection
                month={new Date(month.year, month.month)}
                key={`monthSection${year.year}${monthIndex}`}
              >
                {month.days.map((day, dayIndex) => {
                  const iDay = new Date(day.year, day.month, day.day);

                  const thisDayEvents: Event[] = events
                    // .filter(item => iDay.toISOString() === item.startDay)
                    .map(item => {
                      console.log('---');
                      console.log(iDay.toISOString());
                      console.log(item.startDay);
                      console.log(iDay.toISOString() === item.startDay ? 'true' : 'false');
                      const mappedEvent: Event = {
                        ...item,
                        startDate: new Date(item.start),
                        endDate: new Date(item.end),
                        debug: {
                          _iDay: iDay.toISOString(),
                          _startDay: item.startDay,
                          _today: iDay.toISOString() === item.startDay ? true : false,
                        },
                      };
                      return mappedEvent;
                    });

                  console.debug(thisDayEvents);

                  const onelineEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.ONELINE) return item;
                  });
                  console.debug(onelineEvents);

                  const onelineCombinedEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.ONELINECOMBINED)
                      return item;
                  });
                  console.debug(onelineCombinedEvents);

                  const microEvents: Event[] = thisDayEvents?.filter(item => {
                    if (item.calendar.display_mode === CalendarDisplayMode.MICRO) return item;
                  });
                  console.debug(microEvents);

                  const regularEvents: Event[] = thisDayEvents?.filter(item => {
                    if (
                      item.calendar.display_mode === CalendarDisplayMode.MINI ||
                      item.calendar.display_mode == CalendarDisplayMode.DEFAULT ||
                      item.calendar.display_mode == CalendarDisplayMode.EXTENDED
                    ) {
                      return item;
                    }
                  });
                  console.debug(regularEvents);

                  // reduce commercial event to one per organizer
                  let commercialOrganizerCounter = [];
                  const commercialEvents: Event[] = thisDayEvents?.filter(item => {
                    let adKey: string =
                      iDay.getTime().toString() + '#' + item.calendar.organizer._id;
                    if (
                      !(commercialOrganizerCounter?.[adKey] === true) &&
                      item.calendar.display_mode === CalendarDisplayMode.AD
                    ) {
                      commercialOrganizerCounter[adKey] = true;
                      return item;
                    }
                  });
                  console.debug(commercialEvents);

                  return (
                    <CalendarDaySection
                      day={iDay}
                      key={`daySection${year.year}${monthIndex}${dayIndex}`}
                    >
                      <pre>
                        thisDayEvents:
                        {JSON.stringify(thisDayEvents, null, 2)}
                      </pre>
                      <pre>
                        microEvents:
                        {JSON.stringify(microEvents, null, 2)}
                      </pre>
                      {microEvents?.length > 0 &&
                        microEvents.map((microEvent, microEventIndex) => (
                          <MicroEvent event={microEvent} key={microEvent._id} />
                        ))}
                      <pre>
                        onelineEvents:
                        {JSON.stringify(onelineEvents, null, 2)}
                      </pre>
                      {onelineEvents?.length > 0 && <OnelineEvents events={onelineEvents} />}
                      <pre>
                        onelineCombinedEvents:
                        {JSON.stringify(onelineCombinedEvents, null, 2)}
                      </pre>
                      {onelineCombinedEvents?.length > 0 && (
                        <OnelineCombinedEvents events={onelineCombinedEvents} />
                      )}
                      <pre>
                        regularEvents:
                        {JSON.stringify(regularEvents, null, 2)}
                      </pre>
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
                      <pre>
                        commercialEvents:
                        {JSON.stringify(commercialEvents, null, 2)}
                      </pre>
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
