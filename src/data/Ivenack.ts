import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const IvenackCommunities: string[] = [
  'geoname-2895545', // ivenack
  'geoname-2811676', // weitendorf
  'geoname-2917266', // grischow
  'geoname-2919597', // goddin
  'geoname-2803954', // zolkendorf
  'geoname-2873333', // markow
];

export const IvenackCommunityListQuery = `*[_type == "community" && slug.current!='' && _id in [${IvenackCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOteaserQueryFields} }`;

export const IvenackCommunityDetailListQuery = `*[_type == "community" && slug.current!='' && _id in [${IvenackCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOdetailQueryFields} }`;

export const IvenackCommunitiesAsKeywordList: string =
  'Ivenack, Weitendorf, Grischow, Goddin, Zolkendorf, Markow';
