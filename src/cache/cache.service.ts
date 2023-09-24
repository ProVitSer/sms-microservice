import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import type { Observable } from 'rxjs';
import { concatMap, from, map, toArray } from 'rxjs';
import { BaseCacheService } from './interfaces/cache.interfaces';

@Injectable()
export class CacheService implements BaseCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    public async get<T>(key: string): Promise<T | undefined> {
        const cacheResult = await this.cacheManager.get(key);
        if (cacheResult) return cacheResult as T;
    }

    public async set(key: string, data: string, ttl?: number): Promise<void> {
        return await this.cacheManager.set(key, data, ttl);
    }

    public async reset(): Promise<void> {
        return await this.cacheManager.reset();
    }

    public async del(key: string): Promise<void> {
        return await this.cacheManager.del(key);
    }
}
