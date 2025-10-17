import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { serverFetch } from "./serverFetch";

describe("serverFetch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("returns parsed JSON and calls fetch with expected options", async () => {
    const mockData = { hello: "world" };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ json: async () => mockData } as Response);

    const result = await serverFetch<typeof mockData>({
      url: "https://api.test/data",
    });

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl, calledOptions] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe("https://api.test/data");
    expect(
      (calledOptions as { headers: { "Content-Type": string } }).headers[
        "Content-Type"
      ],
    ).toBe("application/json");
    expect((calledOptions as { cache: string }).cache).toBe("force-cache");
    expect((calledOptions as { next: { revalidate: 60 } }).next).toEqual({
      revalidate: 60,
    });
  });

  test("propagates fetch/json errors as thrown exceptions", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network fail"));
    await expect(
      serverFetch<{ x: number }>({ url: "https://api.test/fail" }),
    ).rejects.toThrow(/network fail/);
  });
});
