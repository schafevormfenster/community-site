import { FC } from 'react';
import { Community } from '../../entities/Community';
import NoCommunityPhoto from '../DoItYourself/NoCommunityPhoto';

export interface CommunityPhotoProps {
  community: Community;
}

/**
 * Show a community photo.
 */
const CommunityPhoto: FC<CommunityPhotoProps> = props => {
  const { community } = props;
  const hasImage =
    community?.wikimediaCommonsImages && community?.wikimediaCommonsImages[0] ? true : false;
  if (!hasImage) return <NoCommunityPhoto />;

  return (
    <img
      className="absolute w-full h-full object-cover object-center print:relative print:h-50mm print:w-full print:object-cover"
      src={community?.wikimediaCommonsImages[0]}
    />
  );
};

export default CommunityPhoto;
