import {
  MunicipalityCoreDTO,
  MunicipalityDTO,
  MunicipalityDTOcoreQueryFields,
  MunicipalityDTOdetailQueryFields,
  MunicipalityDTOteaserQueryFields,
} from './MunicipalityDTO';

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
  geolocation?: {
    lat: number;
    lng: number;
  };
  wikidataId?: string;
  wikimedia_commons_imagelinks?: string[];
  place_id?: string;
  wikidata_id?: string;
  municipality?: MunicipalityDTO;
  twitter_user?: string;
}

export const CommunityDTOcoreQueryFields = `_id, slug, name, municipality->{ ${MunicipalityDTOcoreQueryFields} }`;

export const CommunityDTOteaserQueryFields = `_id, slug, name, municipality->{ ${MunicipalityDTOteaserQueryFields} }`;

export const CommunityDTOdetailQueryFields = `_id, slug, name, place_id, wikidata_id, wikimedia_commons_imagelinks, municipality->{ ${MunicipalityDTOdetailQueryFields} }, geolocation`;
