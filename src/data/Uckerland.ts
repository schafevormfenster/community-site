import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const UckerlandMunicipylityId = 'geoname-6547753';

export const UeckerlandCommunityQuery = `*[_type == "community" && municipality->_id == '${UckerlandMunicipylityId}'] | order(name asc)`;

export const UeckerlandCommunityListQuery = `${UeckerlandCommunityQuery} { ${CommunityDTOteaserQueryFields} }`;

export const UeckerlandCommunityDetailListQuery = `${UeckerlandCommunityQuery} { ${CommunityDTOdetailQueryFields} }`;
