import { FC } from 'react';
import { Community } from '../../entities/Community';
import SvFLogo from '../Images/SvFLogo';

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
    <header>
      <div className="text-center">
        <div className="relative w-12 h-12 ml-2 my-2 -mb-4 z-10 lg:m-4">
          <SvFLogo />
        </div>
        <div className="absolute top-2 left-16 pt-0.5 pl-1 lg:pt-5 lg:pl-4 font-title text-sm lg:text-base text-gray-600">
          Schafe vorm Fenster
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
