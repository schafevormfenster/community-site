import { FC } from 'react';
import { Community } from '../../entities/Community';
import QRCode from 'react-qr-code';

export interface CommunityQrCodeProps {
  community: Community;
}

/**
 * Show a qr code for a community including capaign tracking links.
 */
const CommunityQrCode: FC<CommunityQrCodeProps> = props => {
  const { community } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;
  const campaignParams = [
    { key: 'etcc_cmp', value: 'Showcase' },
    { key: 'etcc_med', value: 'Print' },
  ];
  const params = campaignParams.map(param => `${param.key}=${param.value}`).join('&');
  const codeUrl = `${baseUrl}${community.slug}?${params}`;
  return (
    <div className="hidden print:block bg-white">
      <QRCode value={codeUrl} size={100} />
    </div>
  );
};

export default CommunityQrCode;
