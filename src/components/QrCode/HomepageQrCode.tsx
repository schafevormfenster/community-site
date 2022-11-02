import { FC } from 'react';
import QRCode from 'react-qr-code';

export interface HomepageQrCodeProps {
  url: string;
  campaign: string;
  medium: string;
}

/**
 * Show a qr code for the homepage including campaign tracking parameters.
 */
const HomepageQrCode: FC<HomepageQrCodeProps> = props => {
  const { url, campaign, medium } = props;
  const campaignParams = [
    { key: 'etcc_cmp', value: campaign },
    { key: 'etcc_med', value: medium },
  ];
  const params = campaignParams.map(param => `${param.key}=${param.value}`).join('&');
  const codeUrl = `${url}?${params}`;
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

export default HomepageQrCode;
