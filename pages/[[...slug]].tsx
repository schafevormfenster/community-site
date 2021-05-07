import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community } from '../src/entities/Community';

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
  const community: Community = {
    name: hello,
    slug: hello,
    wikimediaCommonsImages: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Melkerschule_Schlatkow.jpg/800px-Melkerschule_Schlatkow.jpg',
    ],
    municipality: {
      name: 'Gemeinde Hallohagen',
      slug: 'hallohagen',
    },
  };

  return (
    <>
      <Head>
        <title>{hello} (Dorf)</title>
      </Head>
      <CommunityHeader community={community}></CommunityHeader>
      <pre>{JSON.stringify(hello, undefined, 2)}</pre>
    </>
  );
}
