import React, { FC } from 'react';
/**
 * Shows a partner logo with claim.
 */
const NextGenerationEu: FC = props => {
  return (
    <div className="m-auto w-full max-w-md">
      <div className="h-20 print:h-14 w-auto">
        <img
          className="h-full w-auto m-auto max-w-sm mb-2 -ml-1.5 print:-ml-1"
          src="/partner/NextGenerationEu.svg"
          alt="Finanziert von der Europäsichen Union / NextGenerationEU"
        />
      </div>
      <p className="text-sm print:text-2xs print:leading-tight text-left">
        <span className="print:hidden">
          Dieses Projekt wird über die REACT-EU Initiative im Rahmen des Europäischen Sozialfonds
          (ESF) in Mecklenburg-Vorpommern (2021-2027) als Teil der Reaktion der Union auf die
          COVID-19-Pandemie finanziert.
        </span>
        <span className="hidden print:inline">
          Finanziert über die REACT-EU Initiative des Europäischen Sozialfonds (ESF) in
          Mecklenburg-Vorpommern (2021-2027).
        </span>
      </p>
    </div>
  );
};

export default NextGenerationEu;
