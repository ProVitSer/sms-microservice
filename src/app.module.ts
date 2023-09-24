import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config.provider';
import { SmsModule } from './sms/sms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoUseFactory } from './config/mongo.config';
import { SmsConfigModule } from './sms-config/sms-config.module';
import { CacheModule } from './cache/cache.module';
import { HttpRequestModule } from './http-request/http.module';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getMongoUseFactory,
            inject: [ConfigService],
        }),
        SmsModule,
        SmsConfigModule,
        CacheModule,
        HttpRequestModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
