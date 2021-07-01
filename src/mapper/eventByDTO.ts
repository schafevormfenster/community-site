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

  console.log(eventDto?.googleeventattachment);

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
          organizer: {
            _id: eventDto?.calendar?.organizer ? eventDto.calendar?.organizer._id : null,
            name: eventDto?.calendar?.organizer ? eventDto.calendar?.organizer.name : null,
            longname: eventDto?.calendar?.organizer?.longname
              ? eventDto.calendar?.organizer.longname
              : eventDto.calendar?.organizer.name,
          },
        },
        place: {
          _id: eventDto?.place ? eventDto.place._id : null,
          name: eventDto?.place ? eventDto.place.name : null,
          localname: eventDto?.place?.localname ? eventDto.place.localname : eventDto.place.name,
        },
        attachment: {
          fileUrl: eventDto?.googleeventattachment[0]?.fileUrl
            ? eventDto.googleeventattachment[0].fileUrl
            : null,
          mimeType: eventDto?.googleeventattachment[0]?.mimeType
            ? eventDto.googleeventattachment[0].mimeType
            : null,
          title: eventDto?.googleeventattachment[0]?.title
            ? eventDto.googleeventattachment[0].title
            : null,
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
