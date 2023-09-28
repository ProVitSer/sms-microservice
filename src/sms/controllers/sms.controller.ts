import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from '../services/sms.service';
import { SendSmsDto } from '../dto/send-sms.dto';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post('send')
    async sendSms(@Body() body: SendSmsDto) {
        return await this.smsService.sendApiSms(body);
    }
}
