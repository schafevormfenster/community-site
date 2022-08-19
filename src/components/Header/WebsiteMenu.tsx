import React, { FC } from 'react';

export interface WebsiteMenuProps {}

/**
 * Shows a menu.
 */
const WebsiteMenu: FC<WebsiteMenuProps> = props => {
  return (
    <nav className="max-w-screen-md m-auto h-20 flex-initial flex items-center text-center">
      <div>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/"
        >
          Über das Projekt
        </a>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/funktionen"
        >
          Alle Funktionen
        </a>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/start"
        >
          Anmelden
        </a>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/#tarifmodell"
        >
          Tarife
        </a>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/presse"
        >
          Presse
        </a>
        <a
          className="inline-block p-2 pb-1 mx-2 font-medium border-b-2 border-transparent hover:text-white hover:border-brand whitespace-nowrap"
          href="https://www.schafe-vorm-fenster.de/hilfe"
        >
          Anleitungen
        </a>
      </div>
    </nav>
  );
};

export default WebsiteMenu;
