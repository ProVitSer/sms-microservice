import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsSendType, SmsStatus } from '@app/sms/interfaces/sms.enum';
import { v1 } from 'uuid';
import { SendSmsResult } from '../interfaces/sms-api.interfaces';

export class SendSmsResultDataAdapter {
    public status: SmsStatus;
    public smsApiProviderType: SmsApiProviderType;
    public clientId: string;
    public smsId: string;
    public externalNumber: string;
    public smsText: string;
    public result: string;
    public sender: string;
    public smsSendType: SmsSendType;

    constructor(data: SendSmsResult) {
        this.status = data.status;
        this.smsApiProviderType = data.smsApiProviderType;
        this.clientId = data.clientId;
        this.smsId = data.smsId || v1();
        this.externalNumber = data.externalNumber;
        this.smsText = data.smsText;
        this.result = data.result || '';
        this.sender = data.sender;
        this.smsSendType = data.smsSendType;
    }
}
