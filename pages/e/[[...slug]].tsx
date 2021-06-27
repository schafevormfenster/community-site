import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // let slug = 'home'; // set fallback for root page
  // if (params?.slug) slug = params.slug.join('/'); // params has to be used for static props

  const { slug } = params as IParams;

  return {
    props: {
      hello: slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const arr: string[] = ['schlatkow', 'schmatzin', 'wolfradshof']
  // let paths = [];
  //  paths = arr.map((slug) => {

  //     return { params: { slug: slug } };
  // })
  // return { paths: paths, fallback: true };
  return { paths: [], fallback: true };
};

export default function Page({ hello, context }) {
  return (
    <>
      <Head>
        <title>{hello} (Termin)</title>
      </Head>
      <div>Termin</div>
      <pre>{JSON.stringify(hello, undefined, 2)}</pre>
    </>
  );
}
