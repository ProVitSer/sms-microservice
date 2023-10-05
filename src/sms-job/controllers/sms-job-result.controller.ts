import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { SmsJobService } from '../services/sms-job.service';
import { UUIDParam } from '@app/decorators/uuid-param.decorator';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { IncomingSmsSendingResult } from '@app/sms-api/interfaces/sms-api.interfaces';
import { Response } from 'express';

@Controller('sms-job')
export class SmsJobResultController {
    constructor(private readonly smsJobService: SmsJobService) {}

    @Post('result/:smsApiProvider/:clientId')
    async setSmsResult(
        @UUIDParam('clientId') clientId: string,
        @Param('smsApiProvider') smsApiProvider: SmsApiProviderType,
        @Body() body: IncomingSmsSendingResult,
        @Res() res: Response,
    ) {
        try {
            return res.sendStatus(HttpStatus.OK);
        } catch {
            return res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
