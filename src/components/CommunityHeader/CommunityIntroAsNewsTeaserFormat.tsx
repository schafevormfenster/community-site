import { FC } from 'react';
import { Community } from '../../entities/Community';
import CommunityPhoto from './CommunityPhoto';
import CommunityQrCode from './CommunityQrCode';

export interface CommunityIntroAsNewsTeaserFormatProps {
  community: Community;
}

/**
 * Shows a community as news item.
 */
const CommunityIntroAsNewsTeaserFormat: FC<CommunityIntroAsNewsTeaserFormatProps> = ({
  community,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;
  const url = `${baseUrl}${community.slug}`;
  return (
    <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden">
      <CommunityPhoto community={community} />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white print:text-black">
        <h1 className="text-4xl">{community.name}</h1>
        <p className="text-s">Gemeinde {community.municipality.name}</p>
        <p className="hidden print:block text-xs">{url}</p>
      </div>
      <div className="absolute top-2 right-2">
        <CommunityQrCode community={community} />
      </div>
    </div>
  );
};

export default CommunityIntroAsNewsTeaserFormat;
