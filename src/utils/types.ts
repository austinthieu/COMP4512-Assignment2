export interface Gallery {
  galleryId: number;
  galleryName: string;
  galleryNativeName: string;
  galleryCity: string;
  galleryAddress: string;
  galleryCountry: string;
  latitude: number;
  longitude: number;
  galleryWebSite: string;
  flickerPlaceId: string;
  yahooWoeId: string;
  googlePlaceId: string;
}

export interface Painting {
  paintingId: number;
  artistId: number;
  galleryId: number;
  imageFileName: number;
  title: string;
  shapeId: number;
  museumLink: string;
  accessionNumber: number;
  copyrightText: string;
  description?: string;
  excerpt?: string;
  yearOfWork: number;
  width: number;
  height: number;
  medium: string;
  cost: number;
  MSRP: number;
  artists: Artists;
  googleLink?: string;
  googleDescription?: string;
  wikiLink?: string;
  jsonAnnotations: string;
}

export interface Artists {
  firstName: string;
  lastName: string;
}

export interface Genre {
  genreId: number;
  genreName: string;
  eraId: number;
  description: string;
  wikiLink: string;
}

export type SortOption = 'title' | 'year';

export type ActiveTab = 'galleries' | 'favorites';
