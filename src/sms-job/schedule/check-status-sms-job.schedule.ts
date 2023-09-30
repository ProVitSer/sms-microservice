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
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { SMS_STATUS_TO_JOB_SEND_STATUS } from '../sms-job.consts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckStatusSmscJobSchedule {
    constructor(
        private readonly smsJobModelService: SmsJobModelService,
        private readonly cacheService: CacheService,
        private readonly log: AppLoggerService,
        private readonly smsApiProviderService: SmsApiProviderService,
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    async checkSmscSmsJobStatus() {
        try {
            await this.startCheckSmscJobs();
        } catch (e) {
            console.log(e);
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

    private async checkSmsJobStatus(smsJob: SmsJob) {
        const clientConfig = await this.cacheService.get<SmsClientConfig>(smsJob.clientId);
        await Promise.all(
            smsJob.sendSmsInfo.map(async (smsInfo: SendSmsInfo) => {
                await this.checkSmsStatus(smsJob, smsInfo, clientConfig);
            }),
        );
        await this.checkSendSmsInfoStatus(smsJob);
    }

    private async checkSendSmsInfoStatus(smsJob: SmsJob) {
        const result = await this.smsJobModelService.findOne({ smsJobId: smsJob.smsJobId });

        if (!result.sendSmsInfo.some((smsInfo: SendSmsInfo) => smsInfo.sendStatus === SmsJobSendStatus.inProgress)) {
            await this.smsJobModelService.updateOne({ smsJobId: smsJob.smsJobId }, { status: SmsJobStatus.completed });
        }
    }

    private async checkSmsStatus(smsJob: SmsJob, sendSmsInfo: SendSmsInfo, clientConfig: SmsClientConfig) {
        const provider = this.smsApiProviderService.getProvider(clientConfig.smsProviderConfig.smsApiProvider);

        try {
            const checkSmsStatusResult = await provider.checkSmsStatus(this.formatCheckSmsStatusData(smsJob, sendSmsInfo), clientConfig);

            await this.updateSendSmsInfo(sendSmsInfo, checkSmsStatusResult);
        } catch (e) {
            this.log.error(e);
            await this.setErrorSms(sendSmsInfo);
        }
    }

    private async updateSendSmsInfo(sendSmsInfo: SendSmsInfo, checkSmsStatusResult: CheckSmsStatusResultDataAdapter) {
        await this.smsJobModelService.updateOne(
            { 'sendSmsInfo.number': sendSmsInfo.number },
            {
                'sendSmsInfo.$.sendStatus': SMS_STATUS_TO_JOB_SEND_STATUS[checkSmsStatusResult.status],
                'sendSmsInfo.$.result': checkSmsStatusResult.result,
            },
        );
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
