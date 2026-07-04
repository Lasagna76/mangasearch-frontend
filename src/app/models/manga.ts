export interface Genere {
  id:number;
  genere: string;
  categoria: string;
}

export interface Manga {
  id: string;
  title: string;
  generi: Genere[];

  description: string | null;
  copertina: string | null;
  annoPubblicazione: number | null;
  originalLanguage: string | null;

  link: string;

  bayesianRating: number;
  followersCount: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalElements: number;
}