import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsProvider } from '../services/sms.provider';
import { SmsStatus } from './sms.enum';

export interface SendSmsMsgData {
    clientId: string;
    externalNumber: string;
}

export interface CheckSmsStatusMsgData {
    clientId: string;
    smsId: string;
}

export interface SmsProviderInterface {
    get provider(): SmsProviders;
    getProvider(smsProviderType: SmsProviderType): SmsProvider;
}

export type SmsProviders = {
    [key in SmsProviderType]: SmsProvider;
};

export interface SendSmsResult {
    status: SmsStatus;
    clientId: string;
    smsId: string;
    number: string;
    text: string;
    result?: string;
}
