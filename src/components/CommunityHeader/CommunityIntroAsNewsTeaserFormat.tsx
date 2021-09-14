import { FC } from 'react';
import { Community } from '../../entities/Community';
import CommunityPhoto from './CommunityPhoto';

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
    <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden print:bg-transparent print:h-50mm">
      <CommunityPhoto community={community} />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white print:bg-transparent print:from-transparent print:text-black">
        <h1 className="text-4xl">{community.name}</h1>
        <p className="text-s">Gemeinde {community.municipality.name}</p>
      </div>
    </div>
  );
};

export default CommunityIntroAsNewsTeaserFormat;
