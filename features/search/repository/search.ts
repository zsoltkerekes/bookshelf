import { SearchResult } from "@/interfaces/open-library/search-result";
import { serverFetch } from "@/utils/serverFetch";
import { withApiCache } from "@/utils/cache/api-cache";

export interface SearchresultForBooks {
  books: SearchResult | null;
  error: Error | null;
}

export const olBookSearchApiCall = async (
  query: string,
  page: string,
): Promise<SearchresultForBooks> => {
  try {
    const pageNum = Number(page) || 1;
    const json = await serverFetch<SearchResult>({
      url: `https://openlibrary.org/search.json?q=${query}&page=${pageNum}&sort=new`,
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

export const olBookSearch = async (query?: string, page?: string) => {
  return withApiCache(
    olBookSearchApiCall,
    `OL__SEARCH__${query}__${page}`,
    30,
  )(query, page);
};
