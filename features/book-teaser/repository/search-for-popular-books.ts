import { SearchResult } from "@/interfaces/open-library/search-result";
import { serverFetch } from "@/utils/serverFetch";
import { withApiCache, API_CACHE_CONFIG } from "@/utils/cache/api-cache";

export interface SearchresultForPopularBooks {
  popularBooks: SearchResult | null;
  error: Error | null;
}

const searchForPopularBooksApiCall =
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

export const searchForPopularBooks = withApiCache(
  searchForPopularBooksApiCall,
  API_CACHE_CONFIG.OL_POPULAR_BOOKS.KEY,
  API_CACHE_CONFIG.OL_POPULAR_BOOKS.REVALIDATE,
);
