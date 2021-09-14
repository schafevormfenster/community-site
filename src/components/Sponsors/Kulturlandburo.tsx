import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const Kulturlandburo: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-20 print:h-14 w-auto">
        <img
          className="h-full w-auto max-w-sm mb-2 -ml-2.5 print:-ml-2"
          src="/partner/Kulturlandburo.svg"
          alt="In Koperation mit dem Kulturlandbüro"
        />
      </div>
      <p className="text-sm print:text-2xs print:leading-tight text-left">
        <span className="print:hidden">
          Das Kulturlandbüro ist aktiver Kooperatonspartner bei der Entwicklung der ländlichen Räume
          in der Uecker-Randow Region.
        </span>
        <span className="hidden print:inline">In Kooperation mit dem Kulturlandbro.</span>
      </p>
    </div>
  );
};

export default Kulturlandburo;
