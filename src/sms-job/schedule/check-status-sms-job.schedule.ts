import { Cron, CronExpression } from '@nestjs/schedule';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { SendSmsInfo, SmsJob } from '../sms-job.schema';
import { SmsJobModelService } from '../services/sms-job-model.service';
import { CacheService } from '@app/cache/cache.service';
import { SmsApiProviderService } from '@app/sms-api/services/sms-api-provider.service';
import { SmsJobSendStatus, SmsJobStatus } from '../interfaces/sms-job.enum';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { Sms } from '@app/sms/sms.schema';
import { SmsSendType, SmsStatus } from '@app/sms/interfaces/sms.enum';
import { Injectable } from '@nestjs/common';
import { SmsJobUtilsService } from '../services/sms-job-utils.service';

@Injectable()
export class CheckStatusSmscJobSchedule {
    constructor(
        private readonly smsJobModelService: SmsJobModelService,
        private readonly cacheService: CacheService,
        private readonly log: AppLoggerService,
        private readonly smsApiProviderService: SmsApiProviderService,
        private readonly smsJobUtilsService: SmsJobUtilsService,
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    async checkSmscSmsJobStatus() {
        try {
            await this.startCheckSmscJobs();
        } catch (e) {
            this.log.error(e);
        }
    }

    private async startCheckSmscJobs(): Promise<void> {
        const smscSmsJobs = await this.findMessagesToCheck();
        if (smscSmsJobs.length == 0) return;

        for (const smsJob of smscSmsJobs) {
            await this.checkSmsJobStatus(smsJob);
        }
    }

    private async checkSmsJobStatus(smsJob: SmsJob): Promise<void> {
        const clientConfig = await this.cacheService.get<SmsClientConfig>(smsJob.clientId);
        await Promise.all(
            smsJob.sendSmsInfo.map(async (smsInfo: SendSmsInfo) => {
                await this.checkSmsStatus(smsJob, smsInfo, clientConfig);
            }),
        );
        await this.smsJobUtilsService.checkSendSmsInfoStatus(smsJob);
    }

    private async checkSmsStatus(smsJob: SmsJob, sendSmsInfo: SendSmsInfo, clientConfig: SmsClientConfig): Promise<void> {
        const provider = this.smsApiProviderService.getProvider(clientConfig.smsProviderConfig.smsApiProvider);

        try {
            const checkSmsStatusResult = await provider.checkSmsStatus(this.formatCheckSmsStatusData(smsJob, sendSmsInfo), clientConfig);

            await this.smsJobUtilsService.updateSendSmsInfo(smsJob, checkSmsStatusResult, sendSmsInfo.number);
        } catch (e) {
            this.log.error(e);
            await this.setErrorSms(sendSmsInfo);
        }
    }

    private async setErrorSms(sendSmsInfo: SendSmsInfo): Promise<void> {
        await this.smsJobModelService.updateOne(
            { 'sendSmsInfo.number': sendSmsInfo.number },
            {
                'sendSmsInfo.$.sendStatus': SmsJobSendStatus.error,
                'sendSmsInfo.$.result': 'Ошибка получение статуса',
            },
        );
    }

    private formatCheckSmsStatusData(smsJob: SmsJob, sendSmsInfo: SendSmsInfo): Sms {
        return {
            status: SmsStatus.inProgress,
            smsApiProviderType: smsJob.smsApiProviderType,
            smsSendType: SmsSendType.massSending,
            clientId: smsJob.clientId,
            smsId: sendSmsInfo.smsId,
            externalNumber: sendSmsInfo.number,
            sender: smsJob.sender,
            smsText: smsJob.smsText,
            result: sendSmsInfo.result,
        };
    }

    private async findMessagesToCheck(): Promise<SmsJob[]> {
        return await this.smsJobModelService.find({ status: SmsJobStatus.inProgress, smsApiProviderType: SmsApiProviderType.smsc });
    }
}
