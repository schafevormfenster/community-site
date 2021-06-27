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
  geolocation?: object; // TODO: implement DTO
  community?: CommunityDTO;
  wikimedia_commons_imagelinks?: string[];
}

export const PlaceDTOcoreQueryFields = '_id, name';

export const PlaceDTOteaserQueryFields = `${PlaceDTOcoreQueryFields}`;

export const PlaceDTOdetailQueryFields = `${PlaceDTOteaserQueryFields}, place_id, wikidata_id,address,geolocation, community->{ ${CommunityDTOcoreQueryFields} }`;
