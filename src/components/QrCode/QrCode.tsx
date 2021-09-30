import { FC } from 'react';
import QRCode from 'react-qr-code';

export interface QrCodeProps {
  path: string;
  campaign: string;
  medium: string;
}

/**
 * Show a qr code for a community including capaign tracking links.
 */
const QrCode: FC<QrCodeProps> = props => {
  const { path, campaign, medium } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
    : `https://${process.env.VERCEL_URL}/`;
  const campaignParams = [
    { key: 'etcc_cmp', value: campaign },
    { key: 'etcc_med', value: medium },
  ];
  const params = campaignParams.map(param => `${param.key}=${param.value}`).join('&');
  const codeUrl = `${baseUrl}${path}?${params}`;
  return (
    <div className="border-t border-gray-700">
      <p>
        URL:{' '}
        <a href={codeUrl} target="_blank">
          {codeUrl}
        </a>
      </p>
      <QRCode value={codeUrl} size={500} />
    </div>
  );
};

export default QrCode;
