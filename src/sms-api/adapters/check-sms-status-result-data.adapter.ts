import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { CheckSmsStatuResult } from '../interfaces/sms-api.interfaces';

export class CheckSmsStatusResultDataAdapter {
    public readonly status: SmsStatus;
    public readonly clientId: string;
    public readonly smsId: string;
    public readonly result: string;
    constructor(data: CheckSmsStatuResult) {
        this.status = data.status;
        this.clientId = data.clientId;
        this.smsId = data.smsId;
        this.result = data.result;
    }
}
