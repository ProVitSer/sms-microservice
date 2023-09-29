import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsApiProvider } from '../services/sms-api.provider';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsSendType, SmsStatus } from '@app/sms/interfaces/sms.enum';

export interface SmsApiProviderInterface {
    get provider(): SmsApiProviders;
    getProvider(smsProviderType: SmsApiProviderType): SmsApiProvider;
}

export type SmsApiProviders = {
    [key in SmsApiProviderType]: SmsApiProvider;
};

export interface SmsData {
    clientId: string;
    externalNumber: string;
    sender: string;
    smsText: string;
    smsSendType: SmsSendType;
    clientConfig: SmsClientConfig;
}

export interface SendSmsResult {
    status: SmsStatus;
    smsApiProviderType: SmsApiProviderType;
    clientId: string;
    smsId: string;
    externalNumber: string;
    smsText: string;
    result: string;
    sender: string;
    smsSendType: SmsSendType;
}

export interface CheckSmsStatuResult {
    status: SmsStatus;
    clientId: string;
    smsId: string;
    result: string;
}
