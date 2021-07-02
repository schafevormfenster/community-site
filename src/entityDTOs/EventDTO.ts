import { CalendarDTO, CalendarDTOteaserQueryFields } from './CalendarDTO';
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
  googleeventattachment?: [
    {
      fileUrl?: string;
      title?: string;
      mimeType?: string;
      iconLink?: string;
      fileId?: string;
      fileExt?: string;
    }
  ];
  place?: PlaceDTO;
  community?: CommunityDTO;
  calendar?: CalendarDTO;
  categories?: string[];
  event_id?: string;
}

export const EventDTOcoreQueryFields = '_id, name, start';

export const EventDTOteaserQueryFields = `_id, name, start, end, allday, location, googleeventattachment, community->{ ${CommunityDTOcoreQueryFields} }, calendar->{ ${CalendarDTOteaserQueryFields} }, place->{ ${PlaceDTOcoreQueryFields} }`;

export const EventDTOdetailQueryFields = `cancelled, description, ${EventDTOteaserQueryFields}`;
