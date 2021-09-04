import { CommunityDTO, CommunityDTOcoreQueryFields } from './CommunityDTO';

/**
 * Place.
 */
export interface PlaceDTO {
  _id: string;
  name: string;
  localname?: string;
  place_id?: string;
  wikidata_id?: string;
  address?: string;
  address_aliases?: string[];
  geolocation?: {
    lat: number;
    lng: number;
  };
  community?: CommunityDTO;
  wikimedia_commons_imagelinks?: string[];
}

export const PlaceDTOcoreQueryFields = '_id, name';

export const PlaceDTOteaserQueryFields = `${PlaceDTOcoreQueryFields}, address, place_id, geolocation`;

export const PlaceDTOdetailQueryFields = `${PlaceDTOteaserQueryFields}, wikidata_id, community->{ ${CommunityDTOcoreQueryFields} }`;
