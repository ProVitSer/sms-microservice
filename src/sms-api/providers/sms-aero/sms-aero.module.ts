import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsAero } from './sms-aero';

@Module({
    imports: [ConfigModule],
    providers: [SmsAero],
    exports: [SmsAero],
})
export class SmsAeroModule {}
