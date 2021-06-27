import moment from 'moment';
import { FC } from 'react';
import { News } from '../../entities/News';
import { ClockIcon } from '@heroicons/react/outline';

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
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
            <span className="block text-s">
              <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1" />
              {moment(newsItem.date).format('D. MMM')}
            </span>
            {newsItem.title}
          </p>
        </a>
      ) : (
        <div className="relative w-80/screen lg:w-full mr-2 lg:mr-0 lg:mb-4 h-80 float-left bg-yellow-200 overflow-hidden">
          <p className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
            <span className="block text-s">
              <ClockIcon className="h-4 w-4 mb-0.5 inline-block mr-1" />
              {moment(newsItem.date).format('D. MMM')}
            </span>
            {newsItem.title}
          </p>
        </div>
      )}
    </>
  );
};

export default NewsTeaser;
