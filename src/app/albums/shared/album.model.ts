/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */

export interface AlbumCopy {
  purchaseDate: Date;
  purchasedFrom: string;
  purchaseCondition: string;
  purchasePrice: number;
  publisher: string;
  manufacturedIn: string;
  releaseYear: number;
  catalogId: string;
  upc: string;
  promo: boolean;
  recordClubEdition: boolean;
  reissue: boolean;
  reMastered: boolean;
  channels: number;
  mediaType: string;
  mediaSubtype: string;
  halfSpeedMaster: boolean;
  mediaCondition: string;
  coverCondition: string;
  coverCutOut: boolean;
  notes: string;
}

export interface Song {
  order: number;
  name: string;
  duration: string;
}

export interface Album {
  _id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistSort: string;
  label: string;
  genre: string;
  genreId: string;
  style: string;
  originalReleaseYear: number;
  numberOfDiscs: number;
  boxEdition: boolean;
  gatefold: boolean;
  compilation: boolean;
  live: boolean;
  soundtrack: boolean;
  specialEdition: boolean;
  frontCover: string;
  backCover: string;
  songs: Song[];
  copies: AlbumCopy[];
  rating: number;
  comments: string;
}
