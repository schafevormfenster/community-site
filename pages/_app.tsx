import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import '../src/styles/tailwind.css';
import 'moment/locale/de';
import moment from 'moment';
import { polyfill } from 'interweave-ssr';

function MyApp({ Component, pageProps }: AppProps) {
  moment.locale('de');
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
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
