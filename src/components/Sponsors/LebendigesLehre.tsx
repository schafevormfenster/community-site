import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const LebendigesLehre: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-14 w-auto text-center mb-3">
        <a href="https://lebendigeslehre.de/" target="_blank">
          <img
            className="h-full w-auto mx-auto max-w-sm"
            src="/landingpages/lebendigeslehre/LebendigesLehre.png"
            alt="In Koperation mit Stiftung Lebendiges Lehre"
          />
        </a>
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Die{' '}
          <a href="https://lebendigeslehre.de/" target="_blank">
            Stiftung Lebendiges Lehre
          </a>{' '}
          ist aktiver Kooperationspartner bei der digitalen Entwicklung der ländlichen Räume in und
          um die Gemeinde Lehre.
        </span>
        <span className="hidden print:inline">
          In Kooperation mit der Stiftung Lebendiges Lehre.
        </span>
      </p>
    </div>
  );
};

export default LebendigesLehre;
