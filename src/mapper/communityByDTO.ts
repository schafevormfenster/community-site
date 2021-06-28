import { Community, CommunityExcerpt } from '../entities/Community';
import { CommunityDTO } from '../entityDTOs/CommunityDTO';
import { last, split } from 'lodash';

export const communityExcerptByDTO = (communityDto: CommunityDTO): CommunityExcerpt => {
  return communityDto
    ? {
        _id: communityDto._id,
        name: communityDto.name,
        slug: communityDto.slug.current,
      }
    : undefined;
};

export const communityByDTO = (communityDto: CommunityDTO): Community => {
  return communityDto
    ? {
        _id: communityDto._id,
        name: communityDto.name,
        slug: communityDto.slug.current,
        geoLocation: {
          identifiers: {
            geonamesId: last(split(communityDto._id, '.')),
            googlePlaceId: communityDto.place_id ? communityDto.place_id : null,
            wikidataId: communityDto.wikidata_id ? communityDto.wikidata_id : null,
          },
        },
        wikimediaCommonsImages: communityDto.wikimedia_commons_imagelinks
          ? communityDto.wikimedia_commons_imagelinks
          : null,
        municipality: {
          _id: communityDto.municipality ? communityDto.municipality._id : null,
          name: communityDto.municipality ? communityDto.municipality.name : null,
          slug: communityDto.municipality ? communityDto.municipality.slug.current : null,
          geoLocation: {
            identifiers: {
              geonamesId: communityDto.municipality
                ? last(split(communityDto.municipality._id, '.'))
                : null,
              googlePlaceId: communityDto.municipality ? communityDto.municipality.place_id : null,
            },
          },
          socialMediaAccounts: {
            twitter: {
              user: communityDto.municipality ? communityDto.municipality.twitter_user : null,
            },
          },
        },
      }
    : undefined;
};
