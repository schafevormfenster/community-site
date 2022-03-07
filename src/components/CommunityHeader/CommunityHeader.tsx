import { FC } from 'react';
import { Community } from '../../entities/Community';
import SvFLogo from '../Images/SvFLogo';
import Link from 'next/link';
import { LeLeCommunities } from '../../data/LebendigesLehre';

export interface CommunityHeaderProps {
  community: Community;
  /**
   * @default undefined
   */
  badge?: 'beta';
}

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
          <Link href={LeLeCommunities.includes(community._id) ? '/lele' : '/'}>
            <a title="zu den Terminlisten anderer Dörfer">
              <SvFLogo />
            </a>
          </Link>
        </div>
        <div className="absolute top-2 left-16 pt-0.5 pl-1 lg:pt-5 lg:pl-4 font-title text-sm lg:text-base text-gray-600">
          {LeLeCommunities.includes(community._id) ? (
            <>Schafe vorm Fenster + Lebendiges Lehre</>
          ) : (
            <>Schafe vorm Fenster</>
          )}
        </div>
      </div>
      {LeLeCommunities.includes(community._id) && (
        <div className="bg-white absolute z-50 w-12 h-12 top-2 right-2">
          <Link href="/lele">
            <a title="zu den Terminlisten anderer Dörfer">
              <img
                className="w-12 h-12 rounded-sm"
                src="/landingpages/lebendigeslehre/LeLe.jpeg"
                alt="Stiftung Lebendiges lehre"
              />
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default CommunityHeader;
