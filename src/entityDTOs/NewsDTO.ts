import { CommunityDTO, CommunityDTOcoreQueryFields } from './CommunityDTO';
import { MunicipalityDTO, MunicipalityDTOcoreQueryFields } from './MunicipalityDTO';

/**
 * Event.
 */

export const NewsDTOtypeName: string = 'news';

export interface NewsDTO {
  _id: string;
  title: string;
  abstract?: string;
  date: string;
  url?: string;
  image_url?: string;
  community?: CommunityDTO;
  municipality?: MunicipalityDTO;
}

export const NewsDTOcoreQueryFields = '_id, title, date';

export const NewsDTOteaserQueryFields = `${NewsDTOcoreQueryFields}, url, image_url`;

export const NewsDTOdetailQueryFields = `${NewsDTOteaserQueryFields}, abstract, community->{ ${CommunityDTOcoreQueryFields} }, municipality->{ ${MunicipalityDTOcoreQueryFields} }`;
