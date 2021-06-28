// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import '../src/styles/tailwind.css';
import 'moment/locale/de';
import moment from 'moment';

function MyApp({ Component, pageProps }: AppProps) {
  moment.locale('de');
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
