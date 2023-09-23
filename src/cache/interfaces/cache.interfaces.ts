export interface BaseCacheService {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, data: string, ttl?: number): Promise<void>;
  reset(): Promise<void>;
  del(key: string): Promise<void>;
}
