import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

export interface SmsJobData {
    clientId: string;
    smsJobId: string;
    smsApiProvider: SmsApiProviderType;
}
