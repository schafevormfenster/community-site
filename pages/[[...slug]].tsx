import React, { useState, useEffect, useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community } from '../src/entities/Community';
import { News } from '../src/entities/News';
import NewsTeaser from '../src/components/News/NewsTeaser';
import NewsArrangement from '../src/components/News/NewsArrangement';

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? 'is-selected' : ''}`}
    type="button"
    onClick={onClick}
  />
);

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
  // TODO: Dummy data, integrate with API
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

  const newsTeasers: News[] = [
    {
      abstract: 'Die Störche kommen.',
      image: 'https://pbs.twimg.com/media/E0caS5jX0AIcHN4?format=jpg&name=900x900',
      link:
        'https://twitter.com/GSchmatzin/status/1389107927152214017?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwgr%5EeyJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2hvcml6b25fdHdlZXRfZW1iZWRfOTU1NSI6eyJidWNrZXQiOiJodGUiLCJ2ZXJzaW9uIjpudWxsfX0%3D%7Ctwcon%5Etimelinechrome&ref_url=https%3A%2F%2Fschafe-vorm-fenster.de%2Fschlatkow%2F',
    },
    {
      abstract:
        'Die Gemeinde Schmatzin wünscht allen EinwohnerInnen ein frohes neues Jahr. In Mietshäusern sind nun Brandmelder Pflicht - aber auch für jedes Privathaus sind sie dringend zu empfehlen. Unsere Feuerwehr ist toll - aber jede Sekunde zählt.',
      image: null,
      link: 'https://twitter.com/GSchmatzin/status/1375109025281548289/photo/1',
    },
    {
      abstract: 'Endlich endlich. Unser Floß in #Schlatkow ist wieder im Wasser!',
      image: 'https://pbs.twimg.com/media/ExVeXMVXEAUPYHZ?format=jpg&name=900x900',
    },
    {
      abstract:
        'Diese Woche werden die neuen Klettergerüste in #Schlatkow aufgebaut. Danach ist noch einiges zu tun (Sand, Zaun, Geländer, ...) aber es geht vorwärts.',
      image: 'https://pbs.twimg.com/media/Eu_S8aIWgAQ_Mpa?format=jpg&name=900x900',
      link: 'https://twitter.com/GSchmatzin/status/1364541158614065156/photo/1',
    },
  ];

  return (
    <>
      <Head>
        <title>{hello} (Dorf)</title>
      </Head>
      <CommunityHeader community={community}></CommunityHeader>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <NewsArrangement>
            {newsTeasers.map((newsTeaser, index) => (
              <NewsTeaser
                abstract={newsTeaser.abstract}
                image={newsTeaser.image}
                link={newsTeaser.link}
                key={index}
              />
            ))}
          </NewsArrangement>
        </div>
        <div className="col-span-1">Termine</div>
      </main>
      <pre>{JSON.stringify(hello, undefined, 2)}</pre>
    </>
  );
}
