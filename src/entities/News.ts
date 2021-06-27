import { CommunityExcerpt } from './Community';
import { MunicipalityExcerpt } from './Municipality';

/**
 * Micronews item.
 */
export interface News {
  _id: string;
  title: string;
  abstract?: string;
  date: string;
  link?: string;
  image?: string;
  community?: CommunityExcerpt;
  municipality?: MunicipalityExcerpt;
}
