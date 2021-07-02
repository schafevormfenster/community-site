import React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="locale" content="de_DE" />
          <meta name="robots" content="all" />
          <meta name="author" content="Schafe vorm Fenster UG" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@schafeamfenster" />
          <meta name="twitter:creator" content="@schafeamfenster" />
        </Head>
        <body className="w-screen m-0 p-0 bg-gray-200 text-black font-body font-normal text-base leading-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

/*


<!-- Copyright (c) 2000-2021 etracker GmbH. All rights reserved. -->
<!-- This material may not be reproduced, displayed, modified or distributed -->
<!-- without the express prior written permission of the copyright holder. -->
<!-- etracker tracklet 5.0 -->
<script type="text/javascript">
// var et_pagename = "";
// var et_areas = "";
// var et_tval = 0;
// var et_tsale = 0;
// var et_tonr = "";
// var et_basket = "";
</script>
<script id="_etLoader" type="text/javascript" charset="UTF-8" data-block-cookies="true" data-respect-dnt="true" data-secure-code="i9strK" src="//code.etracker.com/code/e.js" async></script>
<!-- etracker tracklet 5.0 end -->


*/
