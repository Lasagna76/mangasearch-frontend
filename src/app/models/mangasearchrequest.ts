export interface Mangasearchrequest {

  originalLanguage?: string;
  includedGenres?: number[];
  excludedGenres?: number[];
  minYear?: number;
  maxYear?: number;
  minRating?: number;
  maxRating?: number;
  sortField?: SortField;
  sortDirection?: SortDirection;
}

export interface SearchPageRequest {
  page: number;
  size: number;
}

export type SortField = 'bayesianRating' | 'followersCount' | 'annoPubblicazione' | 'lastChapterDate';
export type SortDirection = 'ASC' | 'DESC';
export type PageState = 'idle' | 'loading' | 'error' | 'empty' | 'success';

