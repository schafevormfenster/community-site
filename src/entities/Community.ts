import { GeoLocation } from '../types/GeoLocation';
import { Municipality, MunicipalityExcerpt } from './Municipality';

interface CommunityCore {
  _id: string;
  name: string;
  slug: string;
}
/**
 * Community. Also named village.
 */
export interface Community extends CommunityCore {
  description?: string;
  wikimediaCommonsImages?: string[];
  location?: GeoLocation;
  municipality: Municipality;
}

/**
 * Short version of a community. Can be used to shape a community as secondary entity.
 */
export interface CommunityExcerpt extends CommunityCore {
  municipality?: MunicipalityExcerpt;
}
