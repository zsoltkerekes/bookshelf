import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { InMemoryCache } from "./in-memory-cache";

describe("InMemoryCache", () => {
  let cache: InMemoryCache<string>;

  beforeEach(() => {
    cache = new InMemoryCache<string>();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should store and retrieve values", () => {
    cache.set("key1", "value1", 10);
    expect(cache.get("key1")).toBe("value1");
  });

  test("should return null for non-existent keys", () => {
    expect(cache.get("nonexistent")).toBeNull();
  });

  test("should return null for expired entries", () => {
    cache.set("key1", "value1", 1); // 1 second TTL

    // Fast forward time by 2 seconds
    vi.advanceTimersByTime(2000);

    expect(cache.get("key1")).toBeNull();
  });

  test("should return value before expiration", () => {
    cache.set("key1", "value1", 5); // 5 second TTL

    // Fast forward time by 3 seconds
    vi.advanceTimersByTime(3000);

    expect(cache.get("key1")).toBe("value1");
  });

  test("should use default TTL of 10 seconds", () => {
    cache.set("key1", "value1"); // No TTL specified

    // Fast forward time by 9 seconds
    vi.advanceTimersByTime(9000);
    expect(cache.get("key1")).toBe("value1");

    // Fast forward time by 2 more seconds (total 11 seconds)
    vi.advanceTimersByTime(2000);
    expect(cache.get("key1")).toBeNull();
  });

  test("should clear all entries", () => {
    cache.set("key1", "value1", 10);
    cache.set("key2", "value2", 10);

    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key2")).toBe("value2");

    cache.clear();

    expect(cache.get("key1")).toBeNull();
    expect(cache.get("key2")).toBeNull();
  });

  test("should handle different data types", () => {
    const numberCache = new InMemoryCache<number>();
    const objectCache = new InMemoryCache<{ name: string; age: number }>();

    numberCache.set("num", 42, 10);
    objectCache.set("obj", { name: "John", age: 30 }, 10);

    expect(numberCache.get("num")).toBe(42);
    expect(objectCache.get("obj")).toEqual({ name: "John", age: 30 });
  });

  test("should overwrite existing keys", () => {
    cache.set("key1", "value1", 10);
    cache.set("key1", "value2", 10);

    expect(cache.get("key1")).toBe("value2");
  });

  test("should handle negative TTL", () => {
    cache.set("key1", "value1", -1);

    // Negative TTL should be treated as expired
    expect(cache.get("key1")).toBeNull();
  });
});
