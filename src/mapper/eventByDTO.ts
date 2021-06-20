import { Event } from '../entities/Event';
import { EventDTO } from '../entityDTOs/EventDTO';
import { communityExcerptByDTO } from './communityByDTO';

export const eventByDTO = (eventDto: EventDTO): Event => {
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
      }
    : undefined;
};

/*



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
