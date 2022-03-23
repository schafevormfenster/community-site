import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const Kulturlandburo: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-12 w-auto text-center mb-3 print:mb-2">
        <a href="https://www.kulturlandbuero.de/" target="_blank">
          <img
            className="h-full w-auto mx-auto max-w-sm"
            src="/partner/Kulturlandburo.svg"
            alt="In Koperation mit dem Kulturlandbüro"
          />
        </a>
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Das{' '}
          <a href="https://www.kulturlandbuero.de/" target="_blank">
            Kulturlandbüro
          </a>{' '}
          ist aktiver Kooperationspartner bei der digitalen Entwicklung der ländlichen Räume in der
          Uecker-Randow Region.
        </span>
        <span className="hidden print:inline">In Kooperation mit dem Kulturlandbro.</span>
      </p>
    </div>
  );
};

export default Kulturlandburo;
