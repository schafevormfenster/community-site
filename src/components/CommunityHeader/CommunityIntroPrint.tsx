import { FC } from 'react';
import { Community } from '../../entities/Community';
import CommunityPhoto from './CommunityPhoto';
import CommunityQrCode from './CommunityQrCode';

export interface CommunityIntroPrintProps {
  community: Community;
}

/**
 * Shows a community similar to news item but for the case if there are none.
 */
const CommunityIntroPrint: FC<CommunityIntroPrintProps> = ({ community }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;
  const url = `${baseUrl}${community.slug}`;
  return (
    <div className="hidden print:flex relative w-190mm overflow-hidden mt-10mm mb-10mm">
      <div className="flex-grow relative">
        <div className="absolute bottom-0 -mb-1">
          <p>Das ist los in</p>
          <h1 className="text-3xl">{community.name}</h1>
          <p>sowie in der Gemeinde {community.municipality.name} und den umliegenden Orten.</p>

          <p className="mt-1">
            Scanne den QR-Code und hole dir die ausführlichen und aktuellen Infos auf dein Handy.
            <br />
            Trage deine Termine bei uns ein. Auf www.schafe-vorm-fenster.de erfährst du, wie es
            geht.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityIntroPrint;
