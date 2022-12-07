import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const UeckerlandCommunities: string[] = [
  'geoname-2928132', // Fahrenholz
  'geoname-2913378', // Güterberg
  'geoname-2905198', // Hetzdorf
  'geoname-2895316', // Jagow
  'geoname-2875615', // Lübbenow
  'geoname-2871095', // Milow
  'geoname-2866788', // Nechlin
  'geoname-2821448', // Trebenow
  'geoname-2808421', // Wilsickow
  'geoname-2807466', // Wismar
  'geoname-2806608', // Wolfshagen
];

export const UeckerlandCommunityListQuery = `*[_type == "community" && slug.current!='' && _id in [${UeckerlandCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOteaserQueryFields} }`;

export const UeckerlandCommunityDetailListQuery = `*[_type == "community" && slug.current!='' && _id in [${UeckerlandCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOdetailQueryFields} }`;

export const UeckerlandCommunitiesAsKeywordList: string =
  'Ueckerland, Weitendorf, Grischow, Goddin, Zolkendorf, Markow';
