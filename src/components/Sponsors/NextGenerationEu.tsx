import React, { FC } from 'react';
/**
 * Shows a partner logo with claim.
 */
const NextGenerationEu: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-16 print:h-14 w-auto text-center mb-4">
        <img
          className="h-full w-auto max-w-full mx-auto max-w-sm"
          src="/partner/NextGenerationEu.svg"
          alt="Finanziert von der Europäsichen Union / NextGenerationEU"
        />
      </div>
      <p className="text-xs print:text-2xs print:leading-tight text-center">
        <span className="print:hidden">
          Dieses Projekt wird über die REACT-EU Initiative im Rahmen des Europäischen Sozialfonds
          (ESF) in Mecklenburg-Vorpommern (2021-2027) als Teil der Reaktion der Union auf die
          COVID-19-Pandemie finanziert.
        </span>
        <span className="hidden print:inline">
          Finanziert über die REACT-EU Initiative des <br />
          Europäischen Sozialfonds (ESF) in Mecklenburg-Vorpommern (2021-2027).
        </span>
      </p>
    </div>
  );
};

export default NextGenerationEu;
