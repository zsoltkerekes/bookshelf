import { describe, test, expect, vi, afterEach } from "vitest";
import { searchForPopularBooks } from "./search-for-popular-books";

vi.mock("@/utils/serverFetch", () => ({
  serverFetch: vi.fn(),
}));

import { serverFetch } from "@/utils/serverFetch";
import { SearchResult } from "@/interfaces/open-library/search-result";

describe("searchForPopularBooks", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("returns popularBooks on success and null error", async () => {
    const payload = { docs: [{ key: "OL1" }] } as SearchResult;
    (serverFetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      payload,
    );

    const result = await searchForPopularBooks();
    expect(result.error).toBeNull();
    expect(result.popularBooks).toBe(payload);
    expect(serverFetch).toHaveBeenCalledWith({
      url: "https://openlibrary.org/search.json?q=popular&page=1&sort=currently_reading",
    });
  });

  test("returns null popularBooks and error on failure", async () => {
    (serverFetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("boom"),
    );

    const result = await searchForPopularBooks();
    expect(result.popularBooks).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toMatch(/boom/);
  });
});
