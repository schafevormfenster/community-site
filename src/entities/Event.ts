import { Calendar } from './Calendar';
import { CommunityExcerpt } from './Community';
import { Place } from './Place';

/**
 * Event item.
 */
export interface Event {
  _id: string;
  summary: string;
  description?: string;
  location?: string;
  geoLocation?: Geolocation;
  start?: string; // TODO: change to Date and add to mapper
  startDate?: Date;
  startDay?: string;
  end?: string; // TODO: change to Date and add to mapper
  endDate?: Date;
  endDay?: string;
  allday?: boolean;
  status?: 'confirmed' | 'cancelled';
  attachment?: {
    type: 'image' | 'download';
    fileUrl: string;
    url?: string;
    title: string;
    mimeType: string;
    fileId: string;
    fileExt: string;
  };
  // metadata
  created?: string; // TODO: change to Date and add to mapper
  updated?: string; // TODO: change to Date and add to mapper
  categories?: string[];
  // ids
  iCalUID?: string;
  //references
  calendar?: Calendar;
  place?: Place;
  community: CommunityExcerpt;
  distance?: 'community' | 'municipality' | 'surrounding' | 'region';
}

/*
TODO: MAP

cancelled?: boolean; // TODO status?: 'confirmed' | 'cancelled';
  googleeventattachment?: string[]; // TODO: attachments
  place?: PlaceDTO;
  community?: CommunityDTO;

  event_id?: string;
*/
