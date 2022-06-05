import { Event } from '../entities/Event';
import { CalendarMonth } from '../viewObjects/calendarSheet';

export const filterEventsbyMonth = (events: Event[], month: CalendarMonth): Event[] => {
  return events.filter(item => item.startDay.startsWith(month.localString));
};
