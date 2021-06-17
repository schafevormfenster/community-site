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
      <div className="relative w-full h-80 bg-gray-100 mb-8">
        {community?.wikimediaCommonsImages?.length > 0 && (
          <img
            className="absolute w-full h-full object-cover object-center"
            src={community?.wikimediaCommonsImages[0]}
          />
        )}
      </div>
      <div className="text-center">
        <h1 className="text-5xl">{community?.name}</h1>
        <p>({community.municipality.name})</p>
        <code>/{community.slug}</code>
      </div>
      {badge && badge == 'beta' && <div>BETA</div>}
    </header>
  );
};

export default CommunityHeader;
