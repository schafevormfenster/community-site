import { Calendar } from './Calendar';
import { CommunityExcerpt } from './Community';

/**
 * Event item.
 */
export interface Event {
  _id: string;
  summary: string;
  description?: string;
  location?: string;
  geopoint?: {
    lat: number;
    lng: number;
  };
  placeName?: string;
  placeLocalName?: string;
  geoLocation?: Geolocation;
  start?: string; // TODO: change to Date and add to mapper
  startDay?: string;
  end?: string; // TODO: change to Date and add to mapper
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
  community: CommunityExcerpt;
  distance?: 'community' | 'municipality' | 'surrounding' | 'region';
  debug?: any;
}
