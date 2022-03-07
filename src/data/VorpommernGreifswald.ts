import { CommunityDTOteaserQueryFields } from '../entityDTOs/CommunityDTO';

export const vorpommernGreifswaldCommunityListQuery = `*[_type == "community" && slug.current!='' && county_geoname_id == 8648415 && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOteaserQueryFields} }`;
