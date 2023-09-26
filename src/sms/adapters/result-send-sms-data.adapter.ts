import { SmsStatus } from '../interfaces/sms.enum';
import { SendSmsResult } from '../interfaces/sms.interfaces';
import { Sms } from '../schemas/sms.schema';

export class ResultSendSmsDataAdapter implements Sms {
    public status: SmsStatus;
    public clientId: string;
    public smsId: string;
    public number: string;
    public text: string;
    public result: string;
    constructor(data: SendSmsResult) {
        this.status = data.status;
        this.clientId = data.clientId;
        this.smsId = data.smsId;
        this.number = data.number;
        this.text = data.text;
        this.result = data.result || '';
    }
}
