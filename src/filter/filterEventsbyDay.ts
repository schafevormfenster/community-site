import { Event } from '../entities/Event';
import { CalendarDay } from '../viewObjects/calendarSheet';

export const filterEventsbyDay = (events: Event[], day: CalendarDay): Event[] => {
  return events.filter(event => event.startDay === day.localString);
};
