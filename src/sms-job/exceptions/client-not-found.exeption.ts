import { NotFoundException } from '@nestjs/common';

class ClientNotFoundException extends NotFoundException {
    constructor(clientId: string) {
        const message = `Клиент ${clientId} не найден`;
        super(message);
    }
}

export default ClientNotFoundException;
