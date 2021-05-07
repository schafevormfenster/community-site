import { GeoLocation } from '../types/GeoLocation';

/**
 * Municipality.
 */
export interface Municipality {
  name: string;
  slug: string;
  description?: string;
  wikimediaCommonsImages?: string[];
  location?: GeoLocation;
}
