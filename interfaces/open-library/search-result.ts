import { Book } from "./book";

export interface SearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  q: string;
  docs: Book[];
}
