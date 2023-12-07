export enum SmsStatus {
    apiFail = 'apiFail',
    error = 'error',
    inProgress = 'inProgress',
    completed = 'completed',
    cancel = 'cancel',
}

export enum SmsSendType {
    api = 'api',
    pbxEvent = 'pbxEvent',
    massSending = 'massSending',
}
