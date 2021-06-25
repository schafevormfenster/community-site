import { Community } from './Community';

/**
 * Place.
 */
export interface Place {
  _id: string;
  name: string;
  localname?: string;
  place_id?: string;
  wikidata_id?: string;
  community?: Community;
}
