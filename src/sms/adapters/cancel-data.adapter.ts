import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsStatus } from '../interfaces/sms.enum';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';
import { Sms } from '../schemas/sms.schema';
import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

export class CancelDataAdapter implements Sms {
    public status: SmsStatus;
    public smsProvider: SmsProviderType;
    public clientId: string;
    public externalNumber: string;
    public result: string;
    constructor(smsMsgData: SendSmsMsgData, config: SmsClientConfig, resultDescription: string) {
        this.status = SmsStatus.cancel;
        this.smsProvider = config.smsProviderConfig.smsProvider;
        this.clientId = smsMsgData.clientId;
        this.externalNumber = smsMsgData.externalNumber;
        this.result = resultDescription;
    }
}
