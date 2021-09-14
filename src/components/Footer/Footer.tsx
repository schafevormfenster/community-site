import Link from 'next/link';
import React, { FC } from 'react';
import Kulturlandburo from '../Sponsors/Kulturlandburo';
import NextGenerationEu from '../Sponsors/NextGenerationEu';
import SchafeVormFenster from '../Sponsors/SchafeVormFenster';

/**
 * Shows a visual header of a single commuity.
 */
const Footer: FC = props => {
  return (
    <footer className="px-4 py-4 print:absolute print:w-210mm print:px-10mm print:-ml-10mm print:pb-8 print:bottom-0 print:bg-white print:z-overhelpdesk">
      <div id="legal" className="flex mb-4 print:hidden">
        <Link href={`/impressum/#kontakt`}>
          <a className="flex-auto mr-4 border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
            Kontakt
          </a>
        </Link>
        <Link href={`/impressum/#impressum`}>
          <a className="flex-auto mr-4 border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
            Impressum
          </a>
        </Link>
        <Link href={`/impressum/#datenschutz`}>
          <a className="flex-auto border border-gray-200 hover:bg-gray-200 rounded px-2 pt-2 pb-1 leading-none text-center">
            Datenschutzerklärung
          </a>
        </Link>
      </div>
      <div id="partner" className="w-full pr-24 print:pr-0 text-center">
        <div className="flex m-auto">
          <div className="hidden md:block print:block flex-auto mr-4">
            <SchafeVormFenster />
          </div>
          <div className="flex-auto mr-4">
            <NextGenerationEu />
          </div>
          <div className="flex-auto">
            <Kulturlandburo />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
