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
    start: Date;
    end: Date;
    sender: string;
    smsText: string;
}

export type SmsProviderConfigs = SmsAeroConfig | SmsConfig | SmscConfig;
