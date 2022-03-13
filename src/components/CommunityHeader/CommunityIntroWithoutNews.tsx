import { FC } from 'react';
import { LeLeCommunities } from '../../data/LebendigesLehre';
import { Community } from '../../entities/Community';
import CommunityPhoto from './CommunityPhoto';

export interface CommunityIntroWithoutNewsProps {
  community: Community;
}

/**
 * Shows a community similar to news item but for the case if there are none.
 */
const CommunityIntroWithoutNews: FC<CommunityIntroWithoutNewsProps> = ({ community }) => {
  return (
    <div className="relative w-screen lg:w-full lg:mb-4 h-80 bg-yellow-200 overflow-hidden">
      <CommunityPhoto community={community} />
      <div className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black to-transparent p-4 text-white print:text-black">
        <h1 className="text-3xl">{community.name}</h1>
        <p className="text-xs">Gemeinde {community.municipality.name}</p>
        {LeLeCommunities.includes(community._id) && (
          <img
            className="mx-auto px-16 mb-0"
            src="/landingpages/lebendigeslehre/LebendigesLehre_xs.png"
            alt="Stiftung Lebendiges Lehre"
          />
        )}
      </div>
    </div>
  );
};

export default CommunityIntroWithoutNews;
