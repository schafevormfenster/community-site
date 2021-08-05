import React from 'react';
import { FC } from 'react';

/**
 * Shows a visual header of a single commuity.
 */
const NextGenerationEu: FC = props => {
  return (
    <div className="m-auto max-w-md text-center">
      <img
        className="m-auto max-w-sm mb-2"
        src="/NextGenerationEu.svg"
        alt="Finanziert von der Europäsichen Union / NextGenerationEU"
      />
      <p className="text-sm">
        Dieses Projekt wird über die REACT-EU Initiative im Rahmen des Europäischen Sozialfonds
        (ESF) in Mecklenburg-Vorpommern (2021-2027) als Teil der Reaktion der Union auf die
        COVID-19-Pandemie finanziert.
      </p>
    </div>
  );
};

export default NextGenerationEu;
