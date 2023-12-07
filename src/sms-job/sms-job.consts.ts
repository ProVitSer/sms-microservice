import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SmsJobSendStatus } from './interfaces/sms-job.enum';

export const SMS_JOB_PROJECTION = { created: 0, changed: 0 };
export const EVERY_20_SECONDS = '*/20 * * * * *';
export const CLIENT_NOT_ACTIVE = 'Клиент не активен';

export const SMS_STATUS_TO_JOB_SEND_STATUS: { [state in SmsStatus]: SmsJobSendStatus } = {
    [SmsStatus.apiFail]: SmsJobSendStatus.error,
    [SmsStatus.error]: SmsJobSendStatus.error,
    [SmsStatus.inProgress]: SmsJobSendStatus.inProgress,
    [SmsStatus.completed]: SmsJobSendStatus.completed,
    [SmsStatus.cancel]: SmsJobSendStatus.error,
};
