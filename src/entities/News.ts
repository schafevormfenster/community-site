/**
 * Micronews item.
 */
export interface NewsType {
  id: string;
  abstract: string;
  image?: {
    url: string;
    alt: string;
  };
  url: string;
  source: string;
  created: string;
  user: {
    name: string;
    username: string;
  };
}
