import { GetServerSideProps } from 'next';
import { Community } from '../src/entities/Community';
import SanityClientConstructor from '@sanity/client';
import { communityByDTO } from '../src/mapper/communityByDTO';
import { CommunityDTO, CommunityDTOcoreQueryFields } from '../src/entityDTOs/CommunityDTO';

// use a cdn client for fetching data
// put it outside to be used in staticProps and staticPaths
const cdnClient = SanityClientConstructor({
  apiVersion: process.env.SANITY_APIVERSION,
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl =
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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${communityList
        .map(c => {
          return `
            <url>
              <loc>${baseUrl}${c.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
