import { MunicipalityCoreDTO, MunicipalityDTO } from './MunicipalityDTO';

/**
 * Community. Also named village.
 */
export interface CommunityDTO {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  wikimediaCommonsImages?: string[];
  googlePlaceId?: string;
  wikidataId?: string;
  wikimedia_commons_imagelinks?: string[];
  place_id?: string;
  wikidata_id?: string;
  municipality?: MunicipalityDTO;
  twitter_user?: string;
}
