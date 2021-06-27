export class MunicipalityCoreDTO {
  _id: string;
  name: string;
  slug: { current: string };
}

export class MunicipalityDTO extends MunicipalityCoreDTO {
  place_id?: string;
  twitter_user?: string;
}

export const MunicipalityDTOcoreQueryFields = '_id, slug, name';

export const MunicipalityDTOteaserQueryFields = '_id, slug, name';

export const MunicipalityDTOdetailQueryFields = '_id, slug, name, place_id, twitter_user';
