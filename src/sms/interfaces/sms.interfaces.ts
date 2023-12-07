export interface SendSmsMsgData {
    clientId: string;
    externalNumber: string;
}

export interface SendApiSmsMsgData extends SendSmsMsgData {
    smsText: string;
    sender: string;
}
