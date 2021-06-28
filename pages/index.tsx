import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Community } from '../src/entities/Community';
import { News } from '../src/entities/News';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../src/mapper/communityByDTO';
import { CommunityDTO, CommunityDTOcoreQueryFields } from '../src/entityDTOs/CommunityDTO';
import Link from 'next/link';
import SvFLogo from '../src/components/Images/SvFLogo';
import ReactMarkdown from 'react-markdown';

export interface IHomepageProps {
  communities: Community[];
  news: News[];
  meta: { canonicalUrl: string };
  content: { welcome: any };
}

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

export const getStaticProps: GetStaticProps<IHomepageProps> = async () => {
  const canonicalUrl =
    process.env.HTTPS == 'false'
      ? `http://${process.env.VERCEL_URL}/`
      : `https://${process.env.VERCEL_URL}/`;

  /**
   * fetch all communities to create static pathes
   */
  const communityListQuery = `*[_type == "community" && slug.current!=''] | order(municipality->name asc) { ${CommunityDTOcoreQueryFields} }`;
  let communityList: Community[] = new Array();
  await cdnClient
    .fetch(communityListQuery)
    .then(response => {
      const communityDtoList: CommunityDTO[] = response;
      if (communityDtoList)
        communityList = communityDtoList.map(communitytDto => {
          return communityByDTO(communitytDto);
        });
    })
    .catch(err => {
      console.warn(`The query to lookup all communities at sanity failed:`);
    });

  const welcomeMd = await require(`../content/homepage/welcome.md`);
  const welcomeJson = { text: welcomeMd };

  return {
    props: {
      meta: {
        canonicalUrl: canonicalUrl,
      },
      content: {
        welcome: JSON.stringify(welcomeJson),
      },
      communities: communityList,
    },
  };
};

export default function Homepage(props: IHomepageProps) {
  // TODO: Dummy data, integrate with API
  const meta = props.meta;
  const communities = props.communities;
  const content = props.content;
  const welcomeText = JSON.parse(content.welcome);

  /** community search */
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results: Community[] = communities.filter(
      community =>
        community.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        community.municipality.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <>
      <Head>
        <title> Schafe vorm Fenster</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta property="og:image" content="" />
        <meta name="geo.region" content="DE-MV" />
        <link rel="canonical" href={`${meta.canonicalUrl}`} />
        <meta property="og:url" content={`${meta.canonicalUrl}`}></meta>
      </Head>
      <header className="text-center py-4">
        <div className="inline-block w-20 h-20 m-auto">
          <SvFLogo />
        </div>
        <p className="font-title text-lg  text-gray-600">Schafe vorm Fenster</p>
      </header>

      <article className="prose prose-lg px-4 pb-12">
        {content?.welcome && <ReactMarkdown>{welcomeText.text.default}</ReactMarkdown>}
      </article>
      <main className="p-0">
        <div className="community-search h-80 overflow-y-hidden">
          <div className="h-16 px-4 py-2">
            <input
              type="text"
              placeholder="Finde dein Dorf ..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full p-2 border border-secondary rounded"
            />
          </div>
          <div className="h-full px-4 pb-4 bg-gradient-to-b from-white to-gray-400">
            {searchTerm.length > 0 ? (
              <ul className="h-full px-4 pb-4 ">
                {searchResults.map(item => (
                  <li key={item._id}>
                    <Link href={`/${item.slug}`}>
                      <a className="block py-1 px-2">
                        {item.name} (Gemeinde {item?.municipality?.name})
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-2xl leading-relaxed text-gray-600">
                Finde
                <br /> dein Dorf <br />
                hier in <br />
                Vorpommern-Greifswald.
              </p>
            )}
          </div>
        </div>
      </main>
      <aside className="pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <p className="col-span-1 md:col-span-2 text-center py-8 text-lg">
            Kontaktiere uns gerne direkt. Wir beißen nicht.
          </p>
          <div className="col-span-1 px-12 pb-8 text-center">
            <img className="rounded-full max-h-64 m-auto pb-4" src="/team/christian.jpg" />
            <h4 className="pb-2 text-2xl">Christian Sauer</h4>
            <p>
              Projektkoordinator
              <br />
              <a
                className="text-secondary"
                href="mailto:christian@schafe-vorm-fenster.de?cc=jan@schafe-vorm-fenster.de&amp;subject=Hallo Christian.&amp;body=Hallo Christian, ich bin ... komme aus ... und finde Euer Projekt ... Dabei interessiere ich mich besonders für ... und würde gerne wissen ..."
              >
                christian@schafe-vorm-fenster.de
              </a>
              <br />
              <a className="text-secondary" href="tel:++4915678689704‬">
                +49 156 78689704‬
              </a>
            </p>
          </div>
          <div className="col-span-1 px-12 text-center">
            <img className="rounded-full max-h-64 m-auto pb-4" src="/team/jan.jpg" />
            <h4 className="pb-2 text-2xl">Jan-Henrik Hempel</h4>
            <p>
              Technischer Leiter
              <br />
              <a
                className="text-secondary"
                href="mailto:jan@schafe-vorm-fenster.de?cc=christian@schafe-vorm-fenster.de&amp;subject=Hallo Jan.&amp;body=Hallo Jan, ich bin ... komme aus ... und finde Euer Projekt ... Dabei interessiere ich mich besonders für ... und würde gerne wissen ..."
              >
                jan@schafe-vorm-fenster.de
              </a>
              <br />
              <a className="text-secondary" href="tel:++491751661003">
                +49 175 1661003
              </a>
            </p>
          </div>
        </div>
      </aside>

      {
        <footer className="bg-gray-700 text-white text-xs px-8 py-4">
          <hr className="my-4" />
        </footer>
      }
    </>
  );
}
