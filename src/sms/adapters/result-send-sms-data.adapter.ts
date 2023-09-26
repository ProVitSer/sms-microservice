import { SmsStatus } from '../interfaces/sms.enum';
import { Sms } from '../schemas/sms.schema';

export class ResultSendSmsDataAdapter implements Sms {
    status: SmsStatus;
    clientId: string;
    smsId: string;
    number: string;
    text: string;
    result: string;
    constructor() {}
}
