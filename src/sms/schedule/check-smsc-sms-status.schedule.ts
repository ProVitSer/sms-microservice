import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { Sms } from '@app/sms/sms.schema';
import { SmsModelService } from '@app/sms/services/sms-model.service';
import { SmsService } from '@app/sms/services/sms.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsStatus } from '../interfaces/sms.enum';
import { MAX_CHECK_SMS_STATUS_ATTEMPTS } from '../sms.config';
import { SMS_STATUS_FAILED } from '../sms.consts';

@Injectable()
export class CheckSmscSmsStatus {
    constructor(
        private readonly smsModelService: SmsModelService,
        private readonly smsService: SmsService,
        private readonly log: AppLoggerService,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async checkSmsStatus(): Promise<void> {
        try {
            const smscSms = await this.smsModelService.find({
                status: SmsStatus.inProgress,
                smsProvider: SmsApiProviderType.smsc,
                checkSmsStatusAttempts: { $lt: MAX_CHECK_SMS_STATUS_ATTEMPTS },
            });
            await this._checkSmsStatus(smscSms);
        } catch (e) {
            this.log.error(e);
        }
    }

    private async _checkSmsStatus(smscSms: Sms[]): Promise<void> {
        for (const sms of smscSms) {
            const checkSmsStatusAttempts = ++sms.checkSmsStatusAttempts;

            if (checkSmsStatusAttempts >= MAX_CHECK_SMS_STATUS_ATTEMPTS) {
                await this.setSmsFailed(sms);
                continue;
            }

            const result = await this.smsService.getSmsStatus(sms);

            await this.smsModelService.update(
                {
                    smsId: result.smsId,
                },
                {
                    result: result.result,
                    status: result.status,
                    checkSmsStatusAttempts,
                },
            );
        }
    }

    private async setSmsFailed(smscSms: Sms) {
        await this.smsModelService.update({ smsId: smscSms.smsId }, { result: SMS_STATUS_FAILED, status: SmsStatus.apiFail });
    }
}
