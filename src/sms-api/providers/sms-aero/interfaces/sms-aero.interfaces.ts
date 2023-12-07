import { SmsAeroSmsStatus } from './sms-aero.enum';

export interface SmsAeroBaseResponse<T> {
    success: boolean;
    data: T;
    message: string | null;
}

export interface SmsAeroSendSmsData {
    number?: string;
    numbers?: string[];
    sign: string;
    text: string;
    dateSend?: number;
    callbackUrl?: string;
    shortLink?: number;
}

export interface SmsAeroSendSmsResponse {
    id: number;
    from: string;
    number: string;
    text: string;
    status: SmsAeroSmsStatus;
    extendStatus: string;
    channel: string;
    cost?: number;
    dateCreate: number;
    dateSend: number;
}

export interface SmsAeroCheckSmsStatusParams {
    id: number;
}

export interface SmsAeroCheckSmsStatusResponse extends SmsAeroSendSmsResponse {
    dateAnswer: number;
}

export interface SmsAeroCallbackSendingResult {
    id: string;
    status: string;
    extendStatus: string;
}
