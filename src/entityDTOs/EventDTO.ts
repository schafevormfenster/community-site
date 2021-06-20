import { CalendarDTO, CalendarDTOcoreQueryFields } from './CalendarDTO';
import { CommunityDTO, CommunityDTOcoreQueryFields } from './CommunityDTO';
import { PlaceDTO, PlaceDTOcoreQueryFields } from './PlaceDTO';

/**
 * Event.
 */
export interface EventDTO {
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
}

export const EventDTOcoreQueryFields = '_id, name, start';

export const EventDTOteaserQueryFields = `_id, name, start, end, allday, community->{ ${CommunityDTOcoreQueryFields} }, calendar->{ ${CalendarDTOcoreQueryFields} }, place->{ ${PlaceDTOcoreQueryFields} }`;

export const EventDTOdetailQueryFields = `cancelled, location, description, ${EventDTOteaserQueryFields}`;
