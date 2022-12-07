import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const IvenackMunicipylityId = 'geoname-6547834';

export const IvenackCommunityQuery = `*[_type == "community" && municipality->_id == '${IvenackMunicipylityId}'] | order(name asc)`;

export const IvenackCommunityListQuery = `${IvenackCommunityQuery} { ${CommunityDTOteaserQueryFields} }`;

export const IvenackCommunityDetailListQuery = `${IvenackCommunityQuery} { ${CommunityDTOdetailQueryFields} }`;

export const IvenackCommunitiesAsKeywordList: string =
  'Ivenack, Weitendorf, Grischow, Goddin, Zolkendorf, Markow';
