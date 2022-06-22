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
      </Head>
      <IntlProvider locale="de" defaultLocale="de">
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}

export default MyApp;
