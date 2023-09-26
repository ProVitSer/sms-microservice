export enum SmscTranslit {
    translit = 1,
    mpaHc = 2,
}

export enum Tinyurl {
    default = 0,
    reduce = 1,
}

export enum ResponseFormat {
    string = 0,
    number = 1,
    xml = 2,
    json = 3,
}

export enum SmscStatus {
    SmsNotFound = -3,
    Stop = -2,
    WaitingSent = -1,
    PassedOperator = 0,
    SuccessfullySent = 1,
    MessageRead = 2,
    Overdue = 3,
    ClickLink = 4,
    UnableDeliver = 20,
    IncorrectPhone = 22,
    Forbidden = 23,
    InsufficientFunds = 24,
    UnavailableNumber = 25,
}

export enum SmscErrorCode {
    ErrorInParameters = 1,
    IncorrectLoginOrPass = 2,
    InsufficientFunds = 3,
    IpBlock = 4,
    DateFormatError = 5,
    MessageForbidden = 6,
    IncorrectPhone = 7,
    CannotBeDelivered = 8,
    DuplicateError = 9,
}

// 1	Ошибка в параметрах.
// 2	Неверный логин или пароль. Также возникает при попытке отправки сообщения с IP-адреса, не входящего в список разрешенных Клиентом (если такой список был настроен Клиентом ранее).
// 3	Недостаточно средств на счете Клиента.
// 4	IP-адрес временно заблокирован из-за частых ошибок в запросах. Подробнее
// 5	Неверный формат даты.
// 6	Сообщение запрещено (по тексту или по имени отправителя). Также данная ошибка возникает при попытке отправки массовых и (или) рекламных сообщений без заключенного договора.
// 7	Неверный формат номера телефона.
// 8	Сообщение на указанный номер не может быть доставлено.
// 9	Отправка более одного одинакового запроса на передачу SMS-сообщения либо более пяти одинаковых запросов на получение стоимости сообщения в течение минуты.
// Данная ошибка возникает также при попытке отправки пятнадцати и более запросов одновременно с разных подключений под одним логином (too many concurrent requests).
