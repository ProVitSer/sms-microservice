import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SmsAeroSmsStatus } from './interfaces/sms-aero.enum';

export const UNKNOWN_RESULT = 'Неизвестный результат';
export const UNKNOWN_ERROR = 'Неизвестный тип ошибки';

export const SMS_AERO_STATUS_DESCRIPTION: { [state in SmsAeroSmsStatus]: string } = {
    [SmsAeroSmsStatus.inQueue]: 'В очереди',
    [SmsAeroSmsStatus.delivered]: 'Доставлено',
    [SmsAeroSmsStatus.notDelivered]: 'Не доставлено',
    [SmsAeroSmsStatus.transferred]: 'Передано',
    [SmsAeroSmsStatus.waitingStatus]: 'Ожидание статуса сообщения',
    [SmsAeroSmsStatus.moderation]: 'На модерации',
    [SmsAeroSmsStatus.rejected]: 'Сообщение отклонено',
};

export const SMS_AERO_STATUS_TO_SMS_STATUS: { [state in SmsAeroSmsStatus]: SmsStatus } = {
    [SmsAeroSmsStatus.inQueue]: SmsStatus.inProgress,
    [SmsAeroSmsStatus.delivered]: SmsStatus.completed,
    [SmsAeroSmsStatus.notDelivered]: SmsStatus.apiFail,
    [SmsAeroSmsStatus.transferred]: SmsStatus.inProgress,
    [SmsAeroSmsStatus.waitingStatus]: SmsStatus.inProgress,
    [SmsAeroSmsStatus.moderation]: SmsStatus.inProgress,
    [SmsAeroSmsStatus.rejected]: SmsStatus.apiFail,
};
