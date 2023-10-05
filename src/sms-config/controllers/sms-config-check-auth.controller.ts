import { Body, Controller, Post } from '@nestjs/common';
import { SmsConfigService } from '../services/sms-config.service';
import { SmsConfigCheckAuthDto } from '../dto/sms-config-check-auth.dto';

@Controller('sms-config')
export class SmsConfigCheckAuthController {
    constructor(private readonly smsConfigService: SmsConfigService) {}

    @Post('check-auth')
    async checkAuth(@Body() body: SmsConfigCheckAuthDto) {
        return await this.smsConfigService.checkClientAuthConfig(body.clientId);
    }
}
