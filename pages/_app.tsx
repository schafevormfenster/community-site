import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import '../src/styles/tailwind.css';
import { polyfill } from 'interweave-ssr';
import { IntlProvider } from 'react-intl';

function MyApp({ Component, pageProps }: AppProps) {
  polyfill();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no"
        />
        <script
          id="_etLoader"
          type="text/javascript"
          charSet="UTF-8"
          data-block-cookies="true"
          data-respect-dnt="true"
          data-secure-code={process.env.NEXT_PUBLIC_ETRACKER_CODE}
          src="//code.etracker.com/code/e.js"
          async
          defer
        ></script>
        <script
          id="ze-snippet"
          src={'//static.zdassets.com/ekr/snippet.js?key=' + process.env.NEXT_PUBLIC_ZENDESK_KEY}
          async
          defer
        ></script>
      </Head>
      <IntlProvider locale="de" defaultLocale="de">
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}

export default MyApp;
