import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmscModule } from './providers/smsc/smsc.module';
import { SmsAeroModule } from './providers/sms-aero/sms-aero.module';
import { SmsRuModule } from './providers/sms-ru/sms-ru.module';
import { SmsApiProviderService } from './services/sms-api-provider.service';

@Module({
    imports: [ConfigModule, SmscModule, SmsAeroModule, SmsRuModule],
    providers: [SmsApiProviderService],
    exports: [SmsApiProviderService],
    controllers: [],
})
export class SmsApiModule {}
