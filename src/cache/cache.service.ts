import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BaseCacheService } from './interfaces/cache.interfaces';

@Injectable()
export class CacheService implements BaseCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    public async get<T>(key: string): Promise<T | undefined> {
        const cacheResult = await this.cacheManager.store.get(key);
        if (cacheResult) return JSON.parse(cacheResult as string) as T;
    }

    public async set(key: string, data: string, ttl?: number): Promise<void> {
        return await this.cacheManager.store.set(key, data, ttl);
    }

    public async reset(): Promise<void> {
        return await this.cacheManager.store.reset();
    }

    public async del(key: string): Promise<void> {
        return await this.cacheManager.store.del(key);
    }
}
