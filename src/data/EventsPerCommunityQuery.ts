import { MunicipalityDTOcoreQueryFields } from '../entityDTOs/MunicipalityDTO';

export const EventsPerCommunityQuery = `*[_type == "community" && slug.current!='' && county_geoname_id == 8648415 && !(_id in path('drafts.**'))] | order(name asc) { _id, name, slug, "eventCount": count(*[_type == "event" && community._ref == ^._id ]), municipality->{ ${MunicipalityDTOcoreQueryFields} }}`;
