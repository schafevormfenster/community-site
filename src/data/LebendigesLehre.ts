import {
  CommunityDTOdetailQueryFields,
  CommunityDTOteaserQueryFields,
} from '../entityDTOs/CommunityDTO';

export const LeLeCommunities: string[] = [
  'geoname-2879378', // Lehre
  'geoname-2811240', // Wendhausen
  'geoname-2926346', // Flechtorf
  'geoname-2928785', // Essenrode
  'geoname-2928824', // Essehof
  'geoname-2951408', // Beienrode
  'geoname-2916911', // Groß Brunsrode
  'geoname-2889659', // Klein Brunsrode
  'geoname-2939763', // Cremlingen
  'geoname-12110912', // Hondelage
  'geoname-2909225', // Hattorf
  'geoname-2869164', // Mörse
  'geoname-2907599', // Heiligendorf (Stadt Wolfsburg)
  'geoname-2946848', // Boimstorf (Stadt Königslutter am Elm)
  'geoname-2899060', // Hordorf (Gemeinde Cremlingen)
  'geoname-2932891', // Ehmen (Stadt Wolfsburg)
  'geoname-2940416', // Calberlah (Gemeinde Calberlah LK Gifhorn)
];

export const leLeCommunityListQuery = `*[_type == "community" && slug.current!='' && _id in [${LeLeCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOteaserQueryFields} }`;

export const leLeCommunityDetailListQuery = `*[_type == "community" && slug.current!='' && _id in [${LeLeCommunities.map(
  c => `"${c}"`
).join(
  ','
)}] && !(_id in path('drafts.**'))] | order(name asc) { ${CommunityDTOdetailQueryFields} }`;

export const LeLeCommunitiesAsKeywordList: string =
  'Lehre, Wendhausen, Flechtorf, Essenrode,  Essehof,  Beienrode,  Groß Brunsrode, Klein Brunsrode, Cremlingen, Hondelage, Hattorf, Mörse, Heiligendorf, Boimstorf, Hordorf, Ehmen, Calberlah';
