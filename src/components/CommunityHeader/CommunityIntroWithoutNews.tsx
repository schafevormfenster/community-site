import { FC } from 'react';
import { Community } from '../../entities/Community';

export interface CommunityIntroWithoutNewsProps {
  community: Community;
}

/**
 * Shows a community similar to news item but for the case if there are none.
 */
const CommunityIntroWithoutNews: FC<CommunityIntroWithoutNewsProps> = ({ community }) => {
  return (
    <div className="relative w-screen lg:w-full lg:mb-4 h-80 bg-yellow-200 overflow-hidden">
      {community?.wikimediaCommonsImages[0] && (
        <img
          className="absolute w-full h-full object-cover object-center"
          src={community?.wikimediaCommonsImages[0]}
        />
      )}
      <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent p-4 text-white">
        <h1 className="text-3xl">{community.name}</h1>
        <p className="text-xs">Gemeinde {community.municipality.name}</p>
      </div>
    </div>
  );
};

export default CommunityIntroWithoutNews;
