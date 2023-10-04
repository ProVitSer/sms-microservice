import { Module } from '@nestjs/common';
import { SmsAero } from './sms-aero';
import { HttpRequestModule } from '@app/http-request/http.module';
import { SmsAeroApiService } from './sms-aero-api.service';

@Module({
    imports: [HttpRequestModule],
    providers: [SmsAero, SmsAeroApiService],
    exports: [SmsAero],
})
export class SmsAeroModule {}
