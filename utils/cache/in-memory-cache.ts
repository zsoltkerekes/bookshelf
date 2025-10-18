export class InMemoryCache<ValueType> {
  private readonly cache = new Map<
    string,
    {
      value: ValueType;
      timestamp: number;
      ttl: number;
    }
  >();

  set(key: string, value: ValueType, ttlSeconds: number = 10): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  get(key: string): ValueType | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }
}
