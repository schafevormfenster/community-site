import Link from 'next/link';
import React, { FC } from 'react';
import { LeLeCommunities } from '../../data/LebendigesLehre';
import { Community } from '../../entities/Community';
import Kulturlandburo from '../Sponsors/Kulturlandburo';
import LebendigesLehre from '../Sponsors/LebendigesLehre';
import NextGenerationEu from '../Sponsors/NextGenerationEu';

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
      <div id="partner" className="w-full p-8 text-center print:p-0 print:pt-8">
        <div className="flex flex-col m-auto md:flex-row print:flex-row">
          <div className="flex-auto px-2 mb-4 md:mb-0">
            <NextGenerationEu />
          </div>
          <div className="flex-auto px-2 mb-4 md:mb-0">
            {community && LeLeCommunities.includes(community._id) ? (
              <LebendigesLehre />
            ) : (
              <Kulturlandburo />
            )}
          </div>
        </div>
      </div>

      <nav
        id="legal"
        className="h-24 px-4 py-4 text-left bg-gray-800 pr-28 md:pr-4 md:text-center print:hidden"
      >
        <Link href={`https://www.schafe-vorm-fenster.de/impressum`}>
          <a className="inline-block py-2 pl-0 pr-4 my-2 ml-0 mr-2 leading-none text-gray-200 md:mx-2 md:px-2 whitespace-nowrap">
            Impressum
          </a>
        </Link>
        <Link href={`https://www.schafe-vorm-fenster.de/impressum`}>
          <a className="inline-block py-2 pl-0 pr-4 my-2 ml-0 mr-2 leading-none text-gray-200 md:mx-2 md:px-2 whitespace-nowrap">
            Datenschutz
          </a>
        </Link>
        <Link href={`https://twitter.com/schafeamfenster`}>
          <a className="inline-block py-2 pl-0 pr-4 my-2 ml-0 mr-2 leading-none text-gray-200 md:mx-2 md:px-2 whitespace-nowrap">
            Twitter
          </a>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
