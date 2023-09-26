import { SendSmsResponse } from '../interfaces/smsc.interfaces';
import { SendSmsResult } from '@app/sms/interfaces/sms.interfaces';

export class SmscResultAdapter {
    public data: SendSmsResult;
    constructor(result: SendSmsResponse) {}
}
