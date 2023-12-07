import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsUtils } from '../../utils/sms.utils';
import { SendApiSmsMsgData } from '../interfaces/sms.interfaces';
import { SmsSendType } from '../interfaces/sms.enum';

export class BaseSendApiSmsDataAdapter {
    public readonly clientId: string;
    public readonly externalNumber: string;
    public readonly sender: string;
    public readonly smsText: string;
    public readonly smsSendType: SmsSendType;
    public readonly clientConfig: SmsClientConfig;
    constructor(private data: SendApiSmsMsgData, clientConfig: SmsClientConfig) {
        this.clientId = this.data.clientId;
        this.externalNumber = SmsUtils.normalizePhoneNumber(this.data.externalNumber);
        this.sender = data.sender;
        this.smsText = data.smsText;
        this.smsSendType = SmsSendType.api;
        this.clientConfig = clientConfig;
    }
}
