import { SmsProviderConfig } from '../schemas/sms-provider-config.schema';

export interface SmsAeroConfig {
    email: string;
    api_key: string;
}

export interface SmsConfig {
    api_id: string;
}

export interface SmscConfig {
    login: string;
    password: string;
}

export interface SmsTimeRanges {
    start: string;
    end: string;
    sender: string;
    smsText: string;
}

export type SmsProviderConfigs = SmsAeroConfig | SmsConfig | SmscConfig;

export interface SmsClientConfig {
    clientId: string;
    smsProviderConfig: SmsProviderConfig;
    smsTimeRanges: SmsTimeRanges[];
    isActive: boolean;
}
