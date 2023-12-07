import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsSendType } from '@app/sms/interfaces/sms.enum';
import { SmsData } from '../interfaces/sms-api.interfaces';

export class BaseApiSendSmsDataAdapter {
    public readonly clientId: string;
    public readonly externalNumber: string;
    public readonly sender: string;
    public readonly smsText: string;
    public readonly smsSendType: SmsSendType;
    public readonly clientConfig: SmsClientConfig;
    constructor(smsData: SmsData) {
        this.clientId = smsData.clientId;
        this.externalNumber = smsData.externalNumber;
        this.sender = smsData.sender;
        this.smsText = smsData.smsText;
        this.smsSendType = smsData.smsSendType;
        this.clientConfig = smsData.clientConfig;
    }
}
