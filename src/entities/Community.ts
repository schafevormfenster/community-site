import { GeoLocation } from '../types/GeoLocation';
import { Municipality } from './Municipality';

/**
 * Community. Also named village.
 */
export interface Community {
  name: string;
  slug: string;
  description?: string;
  wikimediaCommonsImages?: string[];
  location?: GeoLocation;
  municipality: Municipality;
}
