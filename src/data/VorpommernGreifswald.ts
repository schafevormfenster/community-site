import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const VorpommernGreifswaldCommunityQuery = `*[_type == "community" && county_geoname_id == 8648415] | order(name asc)`;

export const VorpommernGreifswaldCommunityListQuery = `${VorpommernGreifswaldCommunityQuery} { ${CommunityDTOteaserQueryFields} }`;

export const VorpommernGreifswaldCommunityDetailListQuery = `${VorpommernGreifswaldCommunityQuery} { ${CommunityDTOdetailQueryFields} }`;
