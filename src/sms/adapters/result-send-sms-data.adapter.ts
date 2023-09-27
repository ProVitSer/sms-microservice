import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsStatus } from '../interfaces/sms.enum';
import { SmsResult } from '../interfaces/sms.interfaces';
import { Sms } from '../schemas/sms.schema';
import { v1 } from 'uuid';

export class ResultSendSmsDataAdapter implements Sms {
    public status: SmsStatus;
    public smsProvider: SmsProviderType;
    public clientId: string;
    public smsId: string;
    public externalNumber: string;
    public smsText: string;
    public result: string;

    constructor(data: SmsResult) {
        this.status = data.status;
        this.smsProvider = data.smsProvider;
        this.clientId = data.clientId;
        this.smsId = data.smsId || v1();
        this.externalNumber = data.externalNumber;
        this.smsText = data.smsText;
        this.result = data.result || '';
    }
}
