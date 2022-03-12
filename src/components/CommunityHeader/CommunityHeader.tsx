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
        {LeLeCommunities.includes(community._id) ? (
          <>
            <div className="relative w-30 h-12 ml-2 my-2 -mb-4 z-10 lg:m-4 text-left">
              <Link href="/lele">
                <a title="zu den Terminlisten anderer Dörfer">
                  <span className="inline-block w-12 h-12 mr-2">
                    <SvFLogo />
                  </span>
                  <span className="inline-block w-12 h-12 mr-2">
                    <img
                      className="w-12 h-12 rounded-sm border border-gray-100"
                      src="/landingpages/lebendigeslehre/LeLe.jpeg"
                      alt="Stiftung Lebendiges lehre"
                    />
                  </span>
                </a>
              </Link>
            </div>
            <div className="absolute top-2 left-32 pt-0.5 pl-1 lg:pt-5 lg:pl-4 font-title text-sm lg:text-base text-gray-600">
              Lebendiges Lehre
            </div>
          </>
        ) : (
          <>
            <div className="relative w-12 h-12 ml-2 my-2 -mb-4 z-10 lg:m-4">
              <Link href="/">
                <a title="zu den Terminlisten anderer Dörfer">
                  <SvFLogo />
                </a>
              </Link>
            </div>
            <div className="absolute top-2 left-16 pt-0.5 pl-1 lg:pt-5 lg:pl-4 font-title text-sm lg:text-base text-gray-600">
              Schafe vorm Fenster
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default CommunityHeader;
