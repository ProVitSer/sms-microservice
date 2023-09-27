import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { Sms } from '@app/sms/schemas/sms.schema';
import { SmsModelService } from '@app/sms/services/sms-model.service';
import { SmsService } from '@app/sms/services/sms.service';
import { MAX_CHECK_SMS_STATUS_ATTEMPTS } from '@app/sms/sms.config';
import { SMS_STATUS_FAILED } from '@app/sms/sms.consts';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CheckSmscSmsStatus {
    constructor(
        private readonly smsModelService: SmsModelService,
        private readonly smsService: SmsService,
        private readonly log: AppLoggerService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async checkSmsStatus(): Promise<void> {
        try {
            const smscSms = await this.smsModelService.find({
                status: SmsStatus.inProgress,
                smsProvider: SmsProviderType.smsc,
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
