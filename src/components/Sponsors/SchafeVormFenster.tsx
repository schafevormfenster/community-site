import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const SchafeVormFenster: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-20 print:h-14 w-auto">
        <img
          className="py-2.5 h-full w-auto max-w-sm mb-2"
          src="/partner/SchafeVormFenster.svg"
          alt="Ein Projekt der Schafe vorm Fenster UG"
        />
      </div>
      <p className="text-sm print:text-2xs print:leading-tight text-left">
        <span className="print:hidden">
          Die Digitale Terminliste ist ein Projekt der Schafe vorm Fenster UG.
        </span>
        <span className="hidden print:inline">Ein Projekt der Schafe vorm Fenster UG.</span>
      </p>
    </div>
  );
};

export default SchafeVormFenster;
