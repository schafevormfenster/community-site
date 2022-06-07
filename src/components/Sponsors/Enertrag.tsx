import React, { FC } from 'react';

/**
 * Shows a partner logo with claim.
 */
const Enertrag: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-12 w-auto text-center mb-3 print:mb-2">
        <a href="https://enertrag.com/" target="_blank">
          <img
            className="h-full w-auto mx-auto max-w-sm"
            src="/partner/Enertrag.png"
            alt="ENERTRAG - Eine Energie voraus"
          />
        </a>
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Die Digitale Terminliste wird unterstützt von{' '}
          <a href="https://enertrag.com/" target="_blank">
            ENERTRAG - Eine Energie voraus
          </a>
          .
        </span>
        <span className="hidden print:inline">Unterstützt von ENERTRAG.</span>
      </p>
    </div>
  );
};

export default Enertrag;
