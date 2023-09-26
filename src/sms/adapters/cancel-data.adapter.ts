import { SmsStatus } from '../interfaces/sms.enum';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';

export class CancelDataAdapter {
    public status: SmsStatus;
    public clientId: string;
    public number: string;
    public result: string;
    constructor(smsMsgData: SendSmsMsgData, resultDescription: string) {
        this.status = SmsStatus.cancel;
        this.clientId = smsMsgData.clientId;
        this.number = smsMsgData.externalNumber;
        this.result = resultDescription;
    }
}
