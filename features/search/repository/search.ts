import { SearchResult } from "@/interfaces/open-library/search-result";
import { serverFetch } from "@/utils/serverFetch";
import { withApiCache } from "@/utils/cache/api-cache";

export interface SearchresultForBooks {
  books: SearchResult | null;
  error: Error | null;
}

export const olBookSearchApiCall = async (
  query: string,
): Promise<SearchresultForBooks> => {
  try {
    const json = await serverFetch<SearchResult>({
      url: `https://openlibrary.org/search.json?q=${query}&page=1&sort=currently_reading`,
    });
    return {
      books: json,
      error: null,
    };
  } catch (error) {
    return {
      books: null,
      error: error as Error,
    };
  }
};

export const olBookSearch = async (query: string) => {
  return withApiCache(olBookSearchApiCall, "OL_SEARCH-" + query, 30)(query);
};
