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
    <div className="relative w-screen overflow-hidden bg-yellow-200 lg:w-full lg:mb-4 h-80">
      <CommunityPhoto community={community} />
      <div className="absolute bottom-0 w-full p-4 text-center text-white bg-gradient-to-t from-black to-transparent print:text-black">
        <h1 className="text-3xl">{community.name}</h1>
        <p className="text-xs">{community.municipality.name}</p>
        {LeLeCommunities.includes(community._id) && (
          <img
            className="px-16 mx-auto mb-0"
            src="/landingpages/lebendigeslehre/LebendigesLehre_xs.png"
            alt="Stiftung Lebendiges Lehre"
          />
        )}
      </div>
    </div>
  );
};

export default CommunityIntroWithoutNews;
