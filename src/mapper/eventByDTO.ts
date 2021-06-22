import { CalendarDisplayMode, CalendarDisplayModeEnum } from '../entities/Calendar';
import { Event } from '../entities/Event';
import { EventDTO } from '../entityDTOs/EventDTO';
import { communityExcerptByDTO } from './communityByDTO';

export const eventByDTO = (eventDto: EventDTO): Event => {
  const displayMode = (display_mode: string): CalendarDisplayMode => {
    switch (eventDto.calendar.display_mode) {
      case '0':
        return CalendarDisplayModeEnum.MICRO;
      case '1':
        return CalendarDisplayModeEnum.MINI;
      case '2':
        return CalendarDisplayModeEnum.DEFAULT;
      case '3':
        return CalendarDisplayModeEnum.EXTENDED;
      case '4':
        return CalendarDisplayModeEnum.ONELINE;
      default:
        return CalendarDisplayModeEnum.DEFAULT;
    }
  };

  console.log(eventDto);

  return eventDto
    ? {
        _id: eventDto._id,
        summary: eventDto.name,
        description: eventDto.description ? eventDto.description : null,
        start: eventDto.start,
        end: eventDto.end,
        allday: eventDto.allday,
        location: eventDto.location ? eventDto.location : null,
        community: communityExcerptByDTO(eventDto.community),
        calendar: {
          _id: eventDto.calendar._id,
          name: eventDto.calendar.name,
          display_mode: displayMode(eventDto.calendar.display_mode),
        },
      }
    : undefined;
};

/*
  description?: string;
  organizer: Organizer;
  scope: 'Community' | 'Municipality' | 'Surrounding' | 'Region';
  publication_status: '0' | '1';
  display_mode: 'micro' | 'mini' | 'oneline' | 'default' | 'extended';



          _id: string;
  name: string;
  description?: string;
  start?: string;
  end?: string;
  allday?: boolean;
  cancelled?: boolean;
  location?: string;
  googleeventattachment?: string[]; // TODO:
  place?: PlaceDTO;
  community?: CommunityDTO;
  calendar?: CalendarDTO;
  categories?: string[];
      event_id?: string;



      */
