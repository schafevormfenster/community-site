import { GeoLocation } from '../types/GeoLocation';
import { SocialMediaAccounts } from '../types/SocialMediaAccounts';

/**
 * Municipality.
 */

interface MunicipalityCore {
  _id: string;
  name: string;
  slug: string;
}
export interface Municipality extends MunicipalityCore {
  description?: string;
  wikimediaCommonsImages?: string[];
  location?: GeoLocation;
  socialMediaAccounts?: SocialMediaAccounts;
}

export interface MunicipalityExcerpt extends MunicipalityCore {}
