import type { CacheStore } from '@nestjs/cache-manager';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheService } from './cache.service';
import { Configs } from '@app/config/config.interface';

@Global()
@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<Configs, true>) => {
                const { host, port, username, password } = configService.get('redis');
                const store = await redisStore({
                    host,
                    port,
                    username,
                    password,
                });

                return {
                    store: store as unknown as CacheStore,
                };
            },
        }),
    ],
    exports: [CacheModule, CacheService],
    providers: [CacheService],
})
export class CacheModule {}
