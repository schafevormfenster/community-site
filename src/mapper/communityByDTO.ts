import { Community } from '../entities/Community';
import { CommunityDTO } from '../entityDTOs/CommunityDTO';
import { last, split } from 'lodash';

const communityByDTO = (communityDto: CommunityDTO): Community => {
  return communityDto
    ? {
        _id: communityDto._id,
        name: communityDto.name,
        slug: communityDto.slug.current,
        location: {
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
          location: {
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

export default communityByDTO;
