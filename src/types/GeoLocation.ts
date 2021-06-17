interface GeoPoint {
  lat: number;
  lng: number;
}

interface GeoBox {
  east: number;
  south: number;
  north: number;
  west: number;
  accuracyLevel?: number;
}

interface GeoIdentifiers {
  geonamesId: number;
  googlePlaceId?: string;
  wikidataId?: string;
}

interface GeoAddress {
  address?: string;
}

/**
 * Geo location.
 */
export interface GeoLocation {
  identifiers: GeoIdentifiers;
  point?: GeoPoint;
  box?: GeoBox;
  address?: GeoAddress;
}
