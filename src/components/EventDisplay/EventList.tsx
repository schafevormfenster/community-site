import { FC, Fragment } from 'react';
import { CalendarDisplayMode } from '../../entities/Calendar';
import { Event } from '../../entities/Event';
import { CalendarDay } from '../../viewObjects/calendarSheet';
import CommercialAdEvent from './CommercialAdEvent';
import EventTeaser from './EventTeaser';
import MicroEvent from './MicroEvent';
import MiniEvent from './MiniEvent';
import OnelineCombinedEvents from './OnelineCombinedEvents';
import OnelineEvents from './OnelineEvents';
import OpeningHours from './OpeningHours';

const openingHoursCalendarName = 'Öffnungszeiten';

export interface EventListProps {
  events: Event[];
  calendarDay: CalendarDay;
}

/**
 * Shows one event in one single line with less information.
 */
const EventList: FC<EventListProps> = ({ events, calendarDay }) => {
  if (events?.length <= 0) return null;

  const onelineEvents: Event[] = events?.filter(item => {
    if (item.calendar.display_mode === CalendarDisplayMode.ONELINE) return item;
  });

  const onelineCombinedEvents: Event[] = events?.filter(item => {
    if (item.calendar.display_mode === CalendarDisplayMode.ONELINECOMBINED) return item;
  });

  const microEvents: Event[] = events?.filter(item => {
    if (item.calendar.display_mode === CalendarDisplayMode.MICRO) return item;
  });

  const openingHours: Event[] = events?.filter(item => {
    if (item.calendar.name === openingHoursCalendarName) return item;
  });

  const regularEvents: Event[] = events?.filter(item => {
    if (
      (item.calendar.display_mode === CalendarDisplayMode.MINI ||
        item.calendar.display_mode == CalendarDisplayMode.DEFAULT ||
        item.calendar.display_mode == CalendarDisplayMode.EXTENDED) &&
      item.calendar.name !== openingHoursCalendarName
    ) {
      return item;
    }
  });

  // reduce commercial event to one per organizer
  let commercialOrganizerCounter = [];
  const commercialEvents: Event[] = events?.filter(item => {
    let adKey: string = calendarDay.localString + '#' + item.calendar.organizer._id;
    if (
      !(commercialOrganizerCounter?.[adKey] === true) &&
      item.calendar.display_mode === CalendarDisplayMode.AD
    ) {
      commercialOrganizerCounter[adKey] = true;
      return item;
    }
  });

  return (
    <div id={`EventList-${calendarDay.localString}`} className="pb-2">
      {microEvents?.length > 0 &&
        microEvents.map((microEvent, microEventIndex) => (
          <MicroEvent event={microEvent} key={`${microEventIndex}-${microEvent._id}`} />
        ))}

      {onelineEvents?.length > 0 && <OnelineEvents events={onelineEvents} />}

      {onelineCombinedEvents?.length > 0 && (
        <OnelineCombinedEvents events={onelineCombinedEvents} />
      )}
      {openingHours?.length > 0 &&
        openingHours.map((openingHoursEvent, openingHoursEventIndex) => (
          <OpeningHours
            event={openingHoursEvent}
            key={`${openingHoursEventIndex}-${openingHoursEvent._id}`}
          />
        ))}
      {regularEvents?.length > 0 &&
        regularEvents.map((regularEvent, regularEventIndex) => (
          <Fragment key={regularEventIndex}>
            {regularEvent.calendar.display_mode == 'mini' && (
              <MiniEvent event={regularEvent} key={`${regularEventIndex}-${regularEvent._id}`} />
            )}
            {regularEvent.calendar.display_mode != 'mini' && (
              <EventTeaser event={regularEvent} key={`${regularEventIndex}-${regularEvent._id}`} />
            )}
          </Fragment>
        ))}

      {commercialEvents?.length > 0 &&
        commercialEvents.map((commercialEvent, commercialEventIndex) => (
          <CommercialAdEvent
            event={commercialEvent}
            key={`${commercialEventIndex}-${commercialEvent._id}`}
          />
        ))}
    </div>
  );
};

export default EventList;
