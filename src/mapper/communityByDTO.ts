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
  let community: Community = undefined;
  if (communityDto) {
    community = {
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
      municipality: {
        _id: communityDto.municipality._id,
        name: communityDto.municipality.name,
        slug: communityDto.municipality.slug.current,
        geoLocation: {
          identifiers: {
            geonamesId: communityDto.municipality
              ? last(split(communityDto?.municipality._id, '.'))
              : null,
            googlePlaceId: communityDto?.municipality?.place_id
              ? communityDto.municipality.place_id
              : null,
          },
        },
        socialMediaAccounts: {
          twitter: {
            user: communityDto?.municipality?.twitter_user
              ? communityDto.municipality.twitter_user
              : null,
          },
        },
      },
      wikimediaCommonsImages: communityDto.wikimedia_commons_imagelinks
        ? communityDto.wikimedia_commons_imagelinks
        : null,
    };
  }
  if (communityDto?.geolocation?.lat && communityDto?.geolocation?.lng) {
    community.geoLocation.point = {
      lat: communityDto.geolocation.lat,
      lng: communityDto.geolocation.lng,
    };
  }

  return community;
};
