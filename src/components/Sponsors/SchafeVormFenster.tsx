import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const SchafeVormFenster: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-12 w-auto text-center mb-3 print:mb-2">
        <img
          className="h-full w-auto mx-auto max-w-sm"
          src="/partner/SchafeVormFenster.svg"
          alt="Ein Projekt der Schafe vorm Fenster UG"
        />
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Die Digitale Terminliste ist ein Projekt der Schafe vorm Fenster UG aus Schlatkow für
          Vorpommern-Greifswald.
        </span>
        <span className="hidden print:inline">
          Ein Projekt der <br />
          Schafe vorm Fenster UG.
        </span>
      </p>
    </div>
  );
};

export default SchafeVormFenster;
