import { CalendarDTO, CalendarDTOteaserQueryFields } from './CalendarDTO';
import { CommunityDTO, CommunityDTOcoreQueryFields } from './CommunityDTO';

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
  geolocation?: {
    lat: number;
    lng: number;
  };
  placeName?: string;
  placeLocalName?: string;
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
  community?: CommunityDTO;
  calendar?: CalendarDTO;
  categories?: string[];
  event_id?: string;
}

export const EventDTOcoreQueryFields = '_id, name, start';

export const EventDTOteaserQueryFields = `_id, name, start, end, allday, location, geolocation, placeName, placeLocalName, googleeventattachment, community->{ ${CommunityDTOcoreQueryFields} }, calendar->{ ${CalendarDTOteaserQueryFields} }`;

export const EventDTOdetailQueryFields = `cancelled, description, ${EventDTOteaserQueryFields}`;
