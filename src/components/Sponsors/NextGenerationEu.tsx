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
        Dieses Projekt wird finanziert von der Europäischen Union über die REACT-EU Initiative zur
        Abfederung der wirtschaftlichen und sozialen Folgen der Covid19-Pandemie in Europa im Rahmen
        des Europäischen Sozialfonds (ESF) in Mecklenburg-Vorpommern 2021-2027.
      </p>
    </div>
  );
};

export default NextGenerationEu;
