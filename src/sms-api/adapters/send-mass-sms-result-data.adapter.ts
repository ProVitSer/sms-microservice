import { SmsJobStatus } from '@app/sms-job/interfaces/sms-job.enum';
import { SendMassSmsResult, SendSmsToNumbersInfo } from '../interfaces/sms-api.interfaces';

export class SendMassSmsResultDataAdapter {
    public readonly status: SmsJobStatus;
    public readonly smsJobId: string;
    public readonly clientId: string;
    public readonly sendSmsToNumbersInfo: SendSmsToNumbersInfo[];
    constructor(data: SendMassSmsResult) {
        this.status = data.status;
        this.smsJobId = data.smsJobId;
        this.clientId = data.clientId;
        this.sendSmsToNumbersInfo = data.sendSmsToNumbersInfo;
    }
}
