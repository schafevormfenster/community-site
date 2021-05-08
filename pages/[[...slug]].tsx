import React, { useState, useEffect, useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CommunityHeader from '../src/components/CommunityHeader/CommunityHeader';
import { Community } from '../src/entities/Community';
import { useEmblaCarousel } from 'embla-carousel/react';

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

  // TODO: Integrate with twitter api
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(index => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <>
      <Head>
        <title>{hello} (Dorf)</title>
      </Head>
      <CommunityHeader community={community}></CommunityHeader>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <div className="embla overflow-hidden">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide h-96 bg-pink-200" key={1}>
                  <div className="relative h-full w-full">
                    <img
                      className="absolute w-full h-full object-cover object-center"
                      src="https://pbs.twimg.com/media/E0caS5jX0AIcHN4?format=jpg&name=900x900"
                    />
                    <p className="absolute left-0 bottom-0 right-0 p-4 bg-black bg-opacity-60 text-white">
                      Die Störche kommen.
                    </p>
                  </div>
                </div>
                <div className="embla__slide h-96 bg-blue-200" key={2}>
                  Slide 2
                </div>
                <div className="embla__slide h96 bg-red-200" key={3}>
                  Slide 3
                </div>
              </div>
            </div>

            <button className="embla__prev" onClick={scrollPrev}>
              Prev
            </button>
            <button className="embla__next" onClick={scrollNext}>
              Next
            </button>
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
        <div className="">Termine</div>
      </main>
      <pre>{JSON.stringify(hello, undefined, 2)}</pre>
    </>
  );
}
