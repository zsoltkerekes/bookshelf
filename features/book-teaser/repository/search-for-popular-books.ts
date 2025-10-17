import { SearchResult } from "@/interfaces/open-library/search-result";
import { serverFetch } from "@/utils/serverFetch";

export interface SearchresultForPopularBooks {
  popularBooks: SearchResult | null;
  error: Error | null;
}

export const searchForPopularBooks =
  async (): Promise<SearchresultForPopularBooks> => {
    try {
      const json = await serverFetch<SearchResult>({
        url: `https://openlibrary.org/search.json?q=popular&page=1&sort=currently_reading`,
      });
      return {
        popularBooks: json,
        error: null,
      };
    } catch (error) {
      return {
        popularBooks: null,
        error: error as Error,
      };
    }
  };
