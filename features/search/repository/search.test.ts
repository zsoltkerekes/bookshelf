import { describe, test, expect, vi, afterEach } from "vitest";
import { olBookSearch } from "./search";
import { serverFetch } from "@/utils/serverFetch";
import { SearchResult } from "@/interfaces/open-library/search-result";

vi.mock("@/utils/serverFetch", () => ({
  serverFetch: vi.fn(),
}));

vi.mock("@/utils/cache/api-cache", () => ({
  withApiCache: function withApiCache(fn: (...args: unknown[]) => unknown) {
    return async (...args: unknown[]) => await fn(...args);
  },
}));

describe("search", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("returns books for search on success and null error", async () => {
    const payload = { docs: [{ key: "OL1" }] } as SearchResult;
    (serverFetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      payload,
    );

    const result = await olBookSearch("test");
    expect(result.error).toBeNull();
    expect(result.books).toBe(payload);
    expect(serverFetch).toHaveBeenCalledWith({
      url: "https://openlibrary.org/search.json?q=test&page=1&sort=new",
    });
  });

  test("returns null for books and error on failure", async () => {
    (serverFetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("boom"),
    );

    const result = await olBookSearch("test");
    expect(result.books).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toMatch(/boom/);
  });
});
