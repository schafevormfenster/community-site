import { FC } from 'react';
import { News } from '../../entities/News';
import { ClockIcon } from '@heroicons/react/outline';
import { FaTwitter } from 'react-icons/fa';
import { useIntl } from 'react-intl';
export interface NewsTeaserProps {
  newsItem: News;
}

const NewsTeaserContent: FC<News> = props => {
  const { abstract, image = '' } = props;
  return (
    <>
      {image && <img className="absolute w-full h-full object-cover object-center" src={image} />}
      <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
        {abstract}
      </p>
    </>
  );
};

/**
 * Shows a micronews item.
 */
const NewsTeaser: FC<NewsTeaserProps> = ({ newsItem }) => {
  const intl = useIntl();

  let title = newsItem.title;
  title = title.replace(/https?:\/\/t\.co\/([a-zA-Z0-9_]+)$/, '').trim(); // remove twitter link from the visible text

  return (
    <>
      {newsItem?.link ? (
        <a
          href={newsItem.link}
          className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-twitter overflow-hidden"
        >
          {newsItem.image && (
            <img
              className="absolute w-full h-full object-cover object-center"
              src={newsItem.image}
            />
          )}
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white">
            <span className="block text-s">
              <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1" />
              {intl.formatDate(newsItem.date, { day: 'numeric', month: 'long' })}
            </span>
            {title} <FaTwitter size="1rem" className="inline-block ml-2" />
          </p>
        </a>
      ) : (
        <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden">
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-3 pt-12 text-white">
            <span className="block text-s">
              <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1" />
              {intl.formatDate(newsItem.date, { day: 'numeric', month: 'long' })}
            </span>
            {title} <FaTwitter size="1rem" className="inline-block ml-2" />
          </p>
        </div>
      )}
    </>
  );
};

export default NewsTeaser;
