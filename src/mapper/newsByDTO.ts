import { News } from '../entities/News';
import { NewsDTO } from '../entityDTOs/NewsDTO';

export const newsByDTO = (newsDto: NewsDTO): News => {
  let news: News = undefined;
  if (newsDto) {
    news = {
      _id: newsDto._id,
      title: newsDto.title,
      date: newsDto.date,
      abstract: newsDto.abstract ? newsDto.abstract : null,
      link: newsDto.url ? newsDto.url : null,
      image: newsDto.image_url ? newsDto.image_url : null,
    };
  }

  if (newsDto.community) {
    news.community = {
      _id: newsDto.community._id,
      name: newsDto.community.name,
      slug: newsDto.community.slug.current,
    };
  } else {
    news.community = null;
  }
  if (newsDto.municipality) {
    news.municipality = {
      _id: newsDto.municipality._id,
      name: newsDto.municipality.name,
      slug: newsDto.municipality.slug.current,
    };
  } else {
    news.municipality = null;
  }

  return news;
};
