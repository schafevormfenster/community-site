import axios from 'axios';
import { NewsType } from '../../entities/News';

interface TwitterUserTimelineQuery {
  username: string;
}

export type TwitterUserTimelineResponseData = NewsType[];

export type TwitterUserTimelineResponse = TwitterUserTimelineResponseData | null;

export const getTwitterUserTimeline = async (
  query: TwitterUserTimelineQuery
): Promise<TwitterUserTimelineResponse> => {
  console.debug(`Execute getTwitterUserTimeline(${query.username})`);
  if (!query.username) {
    console.error('Twitter username missing.');
    return null;
  }
  console.time('getTwitterUserTimeline-' + query.username);

  const requestUrl: string =
    process.env.NEXT_PUBLIC_SVF_API_URL + '/vendor/twitter/' + query.username;

  const data: any = await axios
    .get(requestUrl)
    .then(response => {
      if (!response.data) throw new Error('Could not find any tweet');
      const news: NewsType[] = response.data as NewsType[];
      return news;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });

  console.timeEnd('getTwitterUserTimeline-' + query.username);
  return data;
};
