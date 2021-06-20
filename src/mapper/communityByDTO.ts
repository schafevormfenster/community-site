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
            googlePlaceId: communityDto.place_id,
            wikidataId: communityDto.wikidata_id,
          },
        },
        wikimediaCommonsImages: communityDto.wikimedia_commons_imagelinks,
        municipality: {
          _id: communityDto.municipality._id,
          name: communityDto.municipality.name,
          slug: communityDto.municipality.slug.current,
          geoLocation: {
            identifiers: {
              geonamesId: last(split(communityDto.municipality._id, '.')),
              googlePlaceId: communityDto.municipality.place_id,
            },
          },
          socialMediaAccounts: {
            twitter: {
              user: communityDto.municipality.twitter_user,
            },
          },
        },
      }
    : undefined;
};
