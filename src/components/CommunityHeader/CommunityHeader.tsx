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
        <div className="relative w-12 h-12 ml-2 my-2 -mb-6 z-10 ">
          <SvFLogo />
        </div>
        <div className="absolute top-2 left-16 pt-0.5 pl-1 font-title text-sm text-gray-600">
          Schafe vorm Fenster
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
