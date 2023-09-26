import { CheckSmsStatusMsgData } from '../interfaces/sms.interfaces';

export class BaseCheckSmsStatusDataAdapter {
    public readonly clientId: string;
    public readonly smsId: string;
    constructor(private data: CheckSmsStatusMsgData) {
        this.clientId = this.data.clientId;
        this.smsId = this.data.smsId;
    }
}
