import { devLog } from "./dev-log";

export interface Options {
  url: string;
}

export async function serverFetch<T>(options: Options) {
  try {
    devLog("⏳ API call started:", options.url);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      devLog("❗ API call timeout:", options.url);
      controller.abort();
    }, 3000);

    const res = await fetch(options.url, {
      headers: {
        "Content-Type": "application/json",
      },
      // Remove caching - let our custom cache handle it
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const json: T = await res.json();
    devLog("✅ API call completed:", options.url);
    return json;
  } catch (error) {
    devLog("❗ API call error:", options.url, error);
    throw error;
  }
}
