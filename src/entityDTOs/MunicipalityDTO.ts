export class MunicipalityCoreDTO {
  _id: string;
  name: string;
  slug: { current: string };
}

export class MunicipalityDTO extends MunicipalityCoreDTO {
  place_id?: string;
  twitter_user?: string;
}
