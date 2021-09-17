import React from 'react';
import Error from 'next/error';
import Head from 'next/head';

export async function getInitialProps({ res }) {
  res.statusCode = 404;
}

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content="3; URL=/" />
      </Head>
      <Error statusCode={404} />;
    </>
  );
}
