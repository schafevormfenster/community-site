import Link from 'next/link';
import React, { FC } from 'react';
import { LeLeCommunities } from '../../data/LebendigesLehre';
import { Community } from '../../entities/Community';
import Kulturlandburo from '../Sponsors/Kulturlandburo';
import LebendigesLehre from '../Sponsors/LebendigesLehre';
import NextGenerationEu from '../Sponsors/NextGenerationEu';
import SchafeVormFenster from '../Sponsors/SchafeVormFenster';

export interface FooterProps {
  community: Community;
}

/**
 * Shows a visual header of a single commuity.
 */
const Footer: FC<FooterProps> = props => {
  const { community } = props;

  return (
    <footer className="print:absolute print:w-210mm print:px-10mm print:-ml-10mm print:pb-8 print:bottom-0 print:bg-white print:z-overhelpdesk">
      <div id="partner" className="w-full p-8 print:pr-0 text-center">
        <div className="flex flex-col md:flex-row m-auto">
          <div className="hidden md:block print:block flex-auto mb-4 md:mb-0 px-2">
            <SchafeVormFenster />
          </div>
          <div className="flex-auto mb-4 md:mb-0 px-2">
            <NextGenerationEu />
          </div>
          <div className="flex-auto mb-4 md:mb-0 px-2">
            {LeLeCommunities.includes(community._id) ? <LebendigesLehre /> : <Kulturlandburo />}
          </div>
        </div>
      </div>

      <nav
        id="legal"
        className="h-24 bg-gray-800 py-4 px-4 pr-28 md:pr-4 text-left md:text-center print:hidden"
      >
        <Link href={`https://www.schafe-vorm-fenster.de/impressum`}>
          <a className="inline-block text-gray-200 ml-0 mr-2 md:mx-2 pl-0 pr-4 md:px-2 py-2 my-2 leading-none whitespace-nowrap">
            Impressum
          </a>
        </Link>
        <Link href={`https://www.schafe-vorm-fenster.de/impressum`}>
          <a className="inline-block text-gray-200 ml-0 mr-2 md:mx-2 pl-0 pr-4 md:px-2 py-2 my-2 leading-none whitespace-nowrap">
            Datenschutz
          </a>
        </Link>
        <Link href={`https://twitter.com/schafeamfenster`}>
          <a className="inline-block text-gray-200 ml-0 mr-2 md:mx-2 pl-0 pr-4 md:px-2 py-2 my-2 leading-none whitespace-nowrap">
            Twitter
          </a>
        </Link>
        <Link href={`https://schafe-vorm-fenster.zendesk.com/hc/de`}>
          <a className="inline-block text-gray-200 ml-0 mr-2 md:mx-2 pl-0 pr-4 md:px-2 py-2 my-2 leading-none whitespace-nowrap">
            Hilfe und Anleitungen
          </a>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
