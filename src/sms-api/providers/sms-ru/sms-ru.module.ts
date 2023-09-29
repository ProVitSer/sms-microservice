import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsRu } from './sms-ru';

@Module({
    imports: [ConfigModule],
    providers: [SmsRu],
    exports: [SmsRu],
})
export class SmsRuModule {}
