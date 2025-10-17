export interface Options {
  url: string;
}

export async function serverFetch<T>(options: Options) {
  const res = await fetch(options.url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  });
  const json: T = await res.json();
  return json;
}
