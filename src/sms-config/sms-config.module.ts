import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsConfig, SmsConfigSchema } from './schemas/sms-config.schema';
import { SmsConfigService } from './sms-config.service';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: SmsConfig.name, schema: SmsConfigSchema }])],
    providers: [SmsConfigService],
    controllers: [],
})
export class SmsConfigModule {}
