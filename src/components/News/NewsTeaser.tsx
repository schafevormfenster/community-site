import { FC } from 'react';
import { useIntl } from 'react-intl';
import { NewsType } from '../../entities/News';

export interface NewsTeaserProps {
  newsItem: NewsType;
}

/**
 * Shows a micronews item.
 */
const NewsTeaser: FC<NewsTeaserProps> = ({ newsItem }) => {
  const intl = useIntl();

  return (
    <>
      {newsItem?.url ? (
        <a
          href={newsItem.url}
          className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-twitter overflow-hidden"
        >
          {newsItem.image && (
            <img
              className="absolute w-full h-full object-cover object-center"
              src={newsItem.image.url}
            />
          )}
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white">
            <span className="block text-s">
              {intl.formatDate(newsItem.created, { day: 'numeric', month: 'long' })}
            </span>
            {newsItem.abstract}
          </p>
        </a>
      ) : (
        <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden">
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white">
            <span className="block text-s">
              {intl.formatDate(newsItem.created, { day: 'numeric', month: 'long' })}
            </span>
            {newsItem.abstract}
          </p>
        </div>
      )}
    </>
  );
};

export default NewsTeaser;
