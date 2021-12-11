import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const Kulturlandburo: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-14 w-auto text-center mb-3">
        <img
          className="h-full w-auto mx-auto max-w-sm"
          src="/partner/Kulturlandburo.svg"
          alt="In Koperation mit dem Kulturlandbüro"
        />
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Das Kulturlandbüro ist aktiver Kooperationspartner bei der digitalen Entwicklung der
          ländlichen Räume in der Uecker-Randow Region.
        </span>
        <span className="hidden print:inline">In Kooperation mit dem Kulturlandbro.</span>
      </p>
    </div>
  );
};

export default Kulturlandburo;
