import { devLog } from "../dev-log";
import { InMemoryCache } from "./in-memory-cache";

const apiCache = new InMemoryCache<unknown>();

export function clearCache(): void {
  apiCache.clear();
  devLog("🧹 Api Cache cleared");
}

export const API_CACHE_CONFIG = {
  OL_POPULAR_BOOKS: {
    KEY: "[open library] popular-books",
    REVALIDATE: 30,
  },
};

/**
 * Creates a cached function that will cache results for the specified duration
 * Uses in-memory cache for reliable development experience
 */
export function withApiCache(
  fn: Function,
  cacheKey: string,
  revalidateSeconds: number = 10,
) {
  return async (...args: unknown[]) => {
    const memoryKey = `${cacheKey}-${JSON.stringify(args)}`;
    const cachedData = apiCache.get(memoryKey);
    if (cachedData) {
      devLog(`✅ Api Cache HIT: [${cacheKey}]`);
      return cachedData;
    }

    devLog(`⏳ Cache MISS: [${cacheKey}]; fetching data...`);
    const result = await fn(...args);
    apiCache.set(memoryKey, result, revalidateSeconds);
    devLog(`✅ Data cached: [${cacheKey}] (TTL: ${revalidateSeconds}s)`);

    return result;
  };
}
