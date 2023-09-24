import { NotFoundException } from '@nestjs/common';

class ClientIdNotFoundException extends NotFoundException {
    constructor(clientId: string) {
        const message = `Пользователь с id ${clientId} не найден`;
        super(message);
    }
}

export default ClientIdNotFoundException;
