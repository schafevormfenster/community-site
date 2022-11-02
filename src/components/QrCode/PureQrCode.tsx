import { FC } from 'react';
import QRCode from 'react-qr-code';

export interface PureQrCodeProps {
  url: string;
}

/**
 * Show a qr code for an url parameters.
 */
const PureQrCode: FC<PureQrCodeProps> = props => {
  const { url } = props;
  return (
    <div className="border-t border-gray-700">
      <p>
        URL:{url}
        <a href={url} target="_blank">
          {url}
        </a>
      </p>
      <QRCode value={url} size={500} level="L" />
    </div>
  );
};

export default PureQrCode;
