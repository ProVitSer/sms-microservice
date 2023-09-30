import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SendSmsInfo, SmsJob } from '@app/sms-job/sms-job.schema';

export class BaseMassSendSmsDataAdapter {
    public readonly clientConfig: SmsClientConfig;
    public readonly smsJobId: string;
    public readonly clientId: string;
    public readonly sender: string;
    public readonly sendSmsInfo: SendSmsInfo[];
    public readonly smsText: string;
    public readonly name: string;
    constructor(smsJob: SmsJob, clientConfig: SmsClientConfig) {
        this.clientConfig = clientConfig;
        this.smsJobId = smsJob.smsJobId;
        this.clientId = smsJob.clientId;
        this.sender = smsJob.sender;
        this.sendSmsInfo = smsJob.sendSmsInfo;
        this.smsText = smsJob.smsText;
        this.name = smsJob.name;
    }
}
