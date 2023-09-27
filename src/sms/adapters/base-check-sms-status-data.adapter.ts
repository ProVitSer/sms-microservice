import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { Sms } from '../schemas/sms.schema';

export class BaseCheckSmsStatusDataAdapter {
    public readonly clientConfig: SmsClientConfig;
    public readonly smsData: Sms;
    constructor(smsData: Sms, clientConfig: SmsClientConfig) {
        this.clientConfig = clientConfig;
        this.smsData = smsData;
    }
}
