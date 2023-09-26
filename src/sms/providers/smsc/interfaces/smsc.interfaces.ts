import { ResponseFormat, SmscErrorCode, SmscStatus, SmscTranslit, Tinyurl } from './smsc.enum';

export interface SmscSendSmsData {
    login: string;
    psw: string;
    phones: string;
    mes: string;
    id?: string;
    sender?: string;
    translit?: SmscTranslit;
    tinyurl?: Tinyurl;
    time?: string;
    tz?: number;
    fmt?: ResponseFormat;
    list?: string;
}

export interface SendSmsResponse {
    status: SmscStatus;
    last_date: string;
    last_timestamp: string;
    flag: string;
    error?: string;
    error_code?: SmscErrorCode;
}
