export interface StoreState {
  languageName: string;
  counterLevel: number;
}

export type Dictionary<T> = { [K: string]: T };
export type Json = Dictionary<string | number | boolean>;
