import Link from 'next/link';
import { FC } from 'react';
import { HelpCenterLinks } from './HelpCenterLinks';
import { CameraIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
export interface NoCommunityPhotoProps {
  /**
   * @default undefined
   */
  badge?: 'beta';
}

/**
 * Show a community photo.
 */
const NoCommunityPhoto: FC<NoCommunityPhotoProps> = props => {
  return (
    <div className="w-full h-3/4 content-center flex align-middle">
      <div className="m-auto px-4 text-center">
        <CameraIcon className="m-auto w-20 text-black mb-1" />
        <p className="text-xl leading-none mb-4">Mach' ein Foto von deinem Dorf.</p>
        <Link href={HelpCenterLinks.AddCommunityImage}>
          <a
            className="rounded bg-secondary text-white px-4 py-1 pb-0.5 leading-none whitespace-nowrap"
            target="_blank"
          >
            So geht's
            <QuestionMarkCircleIcon className="h-4 w-4 mb-0.5 inline-block ml-2 text-white" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NoCommunityPhoto;
