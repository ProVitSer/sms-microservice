import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { v1 } from 'uuid';
import { SmsSendType, SmsStatus } from '../interfaces/sms.enum';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';
import { Sms } from '../sms.schema';

export class CancelDataAdapter implements Sms {
    public status: SmsStatus;
    public clientId: string;
    public externalNumber: string;
    public result: string;
    public smsId: string;
    public smsText: string;
    public sender: string;
    public smsSendType: SmsSendType;
    public smsApiProviderType: SmsApiProviderType;
    constructor(smsMsgData: SendSmsMsgData, config: SmsClientConfig, resultDescription: string) {
        this.status = SmsStatus.cancel;
        this.smsApiProviderType = config.smsProviderConfig.smsApiProvider;
        this.clientId = smsMsgData.clientId;
        this.externalNumber = smsMsgData.externalNumber;
        this.result = resultDescription;
        this.smsId = v1();
        this.smsText = '';
        this.sender = '';
        this.smsSendType = SmsSendType.pbxEvent;
    }
}
