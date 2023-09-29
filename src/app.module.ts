import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoUseFactory } from './config/mongo.config';
import { SmsConfigModule } from './sms-config/sms-config.module';
import { CacheModule } from './cache/cache.module';
import { HttpRequestModule } from './http-request/http.module';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { SmsModule } from './sms/sms.module';
import { SmsjobModule } from './sms-job/sms-job.module';
import { SmsApiModule } from './sms-api/sms-api.module';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getMongoUseFactory,
            inject: [ConfigService],
        }),
        SmsModule,
        SmsjobModule,
        SmsApiModule,
        SmsConfigModule,
        CacheModule,
        HttpRequestModule,
        AppLoggerModule,
        RabbitModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
