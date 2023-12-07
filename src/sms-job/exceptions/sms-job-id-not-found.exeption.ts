import { NotFoundException } from '@nestjs/common';

class SmsJobIdNotFoundException extends NotFoundException {
    constructor(smsJobId: string) {
        const message = `Задачи по смс рассылки с ${smsJobId} не найден`;
        super(message);
    }
}

export default SmsJobIdNotFoundException;
