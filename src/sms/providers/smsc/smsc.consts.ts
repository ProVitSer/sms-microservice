import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SmscErrorCode, SmscStatus } from './interfaces/smsc.enum';

export const SMSC_STATUS_DESCRIPTION: { [state in SmscStatus]: string } = {
    [SmscStatus.SmsNotFound]: 'Сообщение не найдено',
    [SmscStatus.Stop]: 'Остановлено',
    [SmscStatus.WaitingSent]: 'Ожидает отправки',
    [SmscStatus.PassedOperator]: 'Сообщение было передано на SMS-центр оператора для доставки',
    [SmscStatus.SuccessfullySent]: 'Сообщение было успешно доставлено абоненту',
    [SmscStatus.MessageRead]: 'Сообщение было прочитано',
    [SmscStatus.Overdue]: 'Просрочено',
    [SmscStatus.ClickLink]: 'Сообщение было доставлено, и абонентом была нажата короткая ссылка',
    [SmscStatus.UnableDeliver]: 'Невозможно доставить',
    [SmscStatus.IncorrectPhone]: 'Неправильный формат номера телефона',
    [SmscStatus.Forbidden]: 'Запрещено',
    [SmscStatus.InsufficientFunds]: 'Недостаточно средств',
    [SmscStatus.UnavailableNumber]: 'Недоступный номер',
};

export const SMSC_ERROR_CODE_DESCRIPTION: { [state in SmscErrorCode]: string } = {
    [SmscErrorCode.ErrorInParameters]: 'Ошибка в параметрах',
    [SmscErrorCode.IncorrectLoginOrPass]: 'Неверный логин или пароль',
    [SmscErrorCode.InsufficientFunds]: 'Недостаточно средств на счете Клиента',
    [SmscErrorCode.IpBlock]: 'IP-адрес временно заблокирован из-за частых ошибок в запросах',
    [SmscErrorCode.DateFormatError]: 'Неверный формат даты',
    [SmscErrorCode.MessageForbidden]: 'Сообщение запрещено',
    [SmscErrorCode.IncorrectPhone]: 'Неверный формат номера телефона',
    [SmscErrorCode.CannotBeDelivered]: 'Сообщение на указанный номер не может быть доставлено',
    [SmscErrorCode.DuplicateError]: 'Множественная отправка',
};

export const SMSC_STATUS_TO_SMS_STATUS: { [state in SmscStatus]: SmsStatus } = {
    [SmscStatus.SmsNotFound]: SmsStatus.apiFail,
    [SmscStatus.Stop]: SmsStatus.apiFail,
    [SmscStatus.WaitingSent]: SmsStatus.inProgress,
    [SmscStatus.PassedOperator]: SmsStatus.inProgress,
    [SmscStatus.SuccessfullySent]: SmsStatus.completed,
    [SmscStatus.MessageRead]: SmsStatus.completed,
    [SmscStatus.Overdue]: SmsStatus.apiFail,
    [SmscStatus.ClickLink]: SmsStatus.completed,
    [SmscStatus.UnableDeliver]: SmsStatus.apiFail,
    [SmscStatus.IncorrectPhone]: SmsStatus.apiFail,
    [SmscStatus.Forbidden]: SmsStatus.apiFail,
    [SmscStatus.InsufficientFunds]: SmsStatus.apiFail,
    [SmscStatus.UnavailableNumber]: SmsStatus.apiFail,
};
