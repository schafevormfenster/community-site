import { FC } from 'react';
import { Community } from '../../entities/Community';

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
        <h1 className="text-5xl">{community?.name}</h1>
        <p>Gemeinde {community.municipality.name}</p>
      </div>
      {badge && badge == 'beta' && <div>BETA</div>}
    </header>
  );
};

export default CommunityHeader;
