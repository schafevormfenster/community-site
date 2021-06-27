import { FC } from 'react';
import { Community } from '../../entities/Community';

export interface CommunityIntroAsNewsTeaserFormatProps {
  community: Community;
}

/**
 * Shows a community as news item.
 */
const CommunityIntroAsNewsTeaserFormat: FC<CommunityIntroAsNewsTeaserFormatProps> = ({
  community,
}) => {
  return (
    <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden">
      {community?.wikimediaCommonsImages[0] && (
        <img
          className="absolute w-full h-full object-cover object-center"
          src={community?.wikimediaCommonsImages[0]}
        />
      )}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
        <h1 className="text-3xl">{community.name}</h1>
        <p className="text-xs">Gemeinde {community.municipality.name}</p>
      </div>
    </div>
  );
};

export default CommunityIntroAsNewsTeaserFormat;
