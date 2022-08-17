import { FC } from 'react';
import { Community } from '../../entities/Community';
import SvFLogo from '../Images/SvFLogo';
import Link from 'next/link';
import { LeLeCommunities } from '../../data/LebendigesLehre';
import { IvenackCommunities } from '../../data/Ivenack';
import { LebendigesLehreLandingPageSlug } from '../../../pages/lele';
import { GemeindeIvenackLandingPageSlug } from '../../../pages/gemeinde-ivenack';

export interface CommunityHeaderProps {
  community: Community;
  /**
   * @default undefined
   */
  badge?: 'beta';
}

const homeLink = (communityId: string): string => {
  let homePath: string = '/';
  if (LeLeCommunities.includes(communityId)) homePath = `/${LebendigesLehreLandingPageSlug}`;
  if (IvenackCommunities.includes(communityId)) homePath = `/${GemeindeIvenackLandingPageSlug}`;
  return homePath;
};

/**
 * Shows a visual header of a single commuity.
 */
const CommunityHeader: FC<CommunityHeaderProps> = props => {
  const { community } = props;

  if (!community) return <></>;

  return (
    <header className="print:hidden">
      <div className="text-center">
        <div className="relative w-12 h-12 ml-2 my-2 -mb-4 z-10 lg:m-4">
          <Link href={homeLink(community._id)}>
            <a title="zu den Terminlisten anderer Orte">
              <SvFLogo />
            </a>
          </Link>
        </div>
        <div className="absolute top-2 left-16 pt-0.5 pl-1 lg:pt-5 lg:pl-4 font-title text-sm lg:text-base text-gray-600">
          Schafe vorm Fenster
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
