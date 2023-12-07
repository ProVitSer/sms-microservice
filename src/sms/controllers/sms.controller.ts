import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { SmsService } from '../services/sms.service';
import { SendSmsDto } from '../dto/send-sms.dto';
import { Response } from 'express';
import { UUIDParam } from '@app/decorators/uuid-param.decorator';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { IncomingSmsSendingResult } from '@app/sms-api/interfaces/sms-api.interfaces';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @HttpCode(HttpStatus.OK)
    @Post('send')
    async sendSms(@Body() body: SendSmsDto) {
        return await this.smsService.sendApiSms(body);
    }

    @Post('result/:smsApiProvider/:clientId')
    async setSmsResult(
        @UUIDParam('clientId') clientId: string,
        @Param('smsApiProvider') smsApiProvider: SmsApiProviderType,
        @Body() body: IncomingSmsSendingResult,
        @Res() res: Response,
    ) {
        try {
            await this.smsService.parseSmsSendingResult(body, clientId, smsApiProvider);
            return res.sendStatus(HttpStatus.OK);
        } catch {
            return res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
