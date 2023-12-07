import { Alltype, CharsetType, DelSms, ResponseFormat, SmscErrorCode, SmscStatus, SmscTranslit, Tinyurl } from './smsc.enum';

export interface SmscBaseData {
    login: string;
    psw: string;
    phones: string;
    id?: string;
    fmt?: ResponseFormat;
}

export interface SmscSendSmsData extends SmscBaseData {
    mes: string;
    sender?: string;
    translit?: SmscTranslit;
    tinyurl?: Tinyurl;
    time?: string;
    tz?: number;
    list?: string;
}
export interface SmscErrorResponse {
    error?: string;
    error_code?: SmscErrorCode;
}

export interface SmscSendSmsResponse extends SmscErrorResponse {
    cnt?: number;
    id?: string;
}

export interface SmscData {
    clientId: string;
    smsId: string;
    externalNumber: string;
    smsText: string;
}

export interface SmscCheckSmsStatusParams extends Omit<SmscBaseData, 'phones'> {
    id: string;
    phone: string;
    all?: Alltype;
    charset?: CharsetType;
    del?: DelSms;
}

export interface SmscCheckSmsStatusResponse extends SmscErrorResponse {
    status?: SmscStatus;
    last_date?: string;
    last_timestamp?: string;
    flag?: string;
}

export interface SmscSendSmsJob {
    add: number;
    sender?: string;
    login: string;
    psw: string;
    name: string;
    phones: string;
    mes: string;
    fmt?: ResponseFormat;
    charset?: CharsetType;
}

export interface CheckBalanceParams {
    login: string;
    psw: string;
    fmt?: ResponseFormat;
}

export interface CheckBalanceResponse extends SmscErrorResponse {
    balance?: string;
}
