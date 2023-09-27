import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsStatus } from '../interfaces/sms.enum';
import { SendSmsResult } from '../interfaces/sms.interfaces';
import { Sms } from '../schemas/sms.schema';

export class ResultSendSmsDataAdapter implements Sms {
    public status: SmsStatus;
    public smsProvider: SmsProviderType;
    public clientId: string;
    public smsId: string;
    public externalNumber: string;
    public smsText: string;
    public result: string;
    public checkSmsStatusAttempts: number;

    constructor(data: SendSmsResult) {
        this.status = data.status;
        this.smsProvider = data.smsProvider;
        this.clientId = data.clientId;
        this.smsId = data.smsId;
        this.externalNumber = data.externalNumber;
        this.smsText = data.smsText;
        this.result = data.result || '';
        this.checkSmsStatusAttempts = data.checkSmsStatusAttempts || 0;
    }
}
