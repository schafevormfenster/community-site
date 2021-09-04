import { GeoLocation } from '../types/GeoLocation';
import { Community } from './Community';

/**
 * Place.
 */
export interface Place {
  _id: string;
  name: string;
  localname?: string;
  wikidata_id?: string;
  community?: Community;
  geoLocation?: GeoLocation;
}
