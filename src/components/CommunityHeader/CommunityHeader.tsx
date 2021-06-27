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
  const { community, badge } = props;

  if (!community) return <></>;
  return (
    <header>
      <div className="text-center">
        <div className="relative w-10 ml-2 my-2 -mb-5 z-10 ">
          <SvFLogo />
        </div>
      </div>
      {badge && badge == 'beta' && <div>BETA</div>}
    </header>
  );
};

export default CommunityHeader;
