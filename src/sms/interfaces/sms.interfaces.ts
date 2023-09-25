import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsSender } from '../services/sms-sender';

export interface SmsMsgData {
    clientId: string;
    externalNumber: string;
}

export interface SmsProviderInterface {
    get provider(): SmsProviders;
    getProvider(smsProviderType: SmsProviderType): SmsSender;
}

export type SmsProviders = {
    [key in SmsProviderType]: SmsSender;
};
