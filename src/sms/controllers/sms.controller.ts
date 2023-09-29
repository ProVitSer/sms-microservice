import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SmsService } from '../services/sms.service';
import { SendSmsDto } from '../dto/send-sms.dto';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @HttpCode(HttpStatus.OK)
    @Post('send')
    async sendSms(@Body() body: SendSmsDto) {
        return await this.smsService.sendApiSms(body);
    }
}
