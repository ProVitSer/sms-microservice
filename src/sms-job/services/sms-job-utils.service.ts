import { Injectable } from '@nestjs/common';
import { SmsJobModelService } from './sms-job-model.service';
import { SMS_STATUS_TO_JOB_SEND_STATUS } from '../sms-job.consts';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters';
import { SendSmsInfo, SmsJob } from '../sms-job.schema';
import { SmsJobSendStatus, SmsJobStatus } from '../interfaces/sms-job.enum';

@Injectable()
export class SmsJobUtilsService {
    constructor(private readonly smsJobModelService: SmsJobModelService) {}

    public async updateSendSmsInfo(smsJob: SmsJob, checkSmsStatusResult: CheckSmsStatusResultDataAdapter, number: string): Promise<void> {
        await this.smsJobModelService.updateOne(
            { smsJobId: smsJob.smsJobId, 'sendSmsInfo.number': number },
            {
                'sendSmsInfo.$.sendStatus': SMS_STATUS_TO_JOB_SEND_STATUS[checkSmsStatusResult.status],
                'sendSmsInfo.$.result': checkSmsStatusResult.result,
                'sendSmsInfo.$.changed': new Date(),
            },
        );
    }

    public async checkSendSmsInfoStatus(smsJob: SmsJob): Promise<void> {
        const result = await this.smsJobModelService.findOne({ smsJobId: smsJob.smsJobId });

        if (!result.sendSmsInfo.some((smsInfo: SendSmsInfo) => smsInfo.sendStatus === SmsJobSendStatus.inProgress)) {
            await this.smsJobModelService.updateOne({ smsJobId: smsJob.smsJobId }, { status: SmsJobStatus.completed });
        }
    }
}
