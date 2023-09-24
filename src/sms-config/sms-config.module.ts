import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsConfig, SmsConfigSchema } from './schemas/sms-config.schema';
import { SmsConfigService } from './services/sms-config.service';
import { SmsConfigController } from './controllers/sms-config.controller';
import { SmsTimeRanges, SmsTimeRangesSchema } from './schemas/sms-time-ranges.schema';
import { SmsConfigCacheService } from './services/sms-config-cache.service';
import { SmsConfigModelService } from './services/sms-config-model.service';
import { SmsTimeRangesModelService } from './services/sms-time-ranges-model.service';
import { SmsTimeRangesConfigController } from './controllers/sms-time-ranges-config.controller';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            { name: SmsConfig.name, schema: SmsConfigSchema },
            { name: SmsTimeRanges.name, schema: SmsTimeRangesSchema },
        ]),
    ],
    providers: [SmsConfigService, SmsConfigCacheService, SmsConfigModelService, SmsTimeRangesModelService],
    controllers: [SmsConfigController, SmsTimeRangesConfigController],
})
export class SmsConfigModule {}
