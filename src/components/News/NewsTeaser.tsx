import { FC } from 'react';
import { News } from '../../entities/News';

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
const NewsTeaser: FC<News> = props => {
  const { abstract, image, link = '' } = props;

  return (
    <>
      {link ? (
        <a href={link} className="relative h-full md:h-96 xl:h-80 bg-twitter overflow-hidden">
          <NewsTeaserContent abstract={abstract} image={image} link={link} />
        </a>
      ) : (
        <div className="relative h-full md:h-96 xl:h-80 bg-yellow-200 overflow-hidden">
          <NewsTeaserContent abstract={abstract} image={image} link={link} />
        </div>
      )}
    </>
  );
};

export default NewsTeaser;
