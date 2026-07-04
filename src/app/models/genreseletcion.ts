import { Genere } from "./manga";

export type GenreState = 'neutral' | 'include' | 'exclude';

export interface GenreDialogData {
  generi: Genere[];
  selection: GenreDialogResult;   // selezione corrente (per riaprire con lo stato salvato)
}

export interface GenreDialogResult {
  include: number[];   
  exclude: number[];
}
