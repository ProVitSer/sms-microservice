export enum SmsAeroSmsApiUrlPath {
    sendSms = 'sms/send',
    checkSmsStatus = 'sms/status',
    getSmsList = 'sms/list',
    auth = 'auth',
}

export enum SmsAeroSmsStatus {
    inQueue = 0,
    delivered = 1,
    notDelivered = 2,
    transferred = 3,
    waitingStatus = 4,
    moderation = 8,
    rejected = 6,
}
