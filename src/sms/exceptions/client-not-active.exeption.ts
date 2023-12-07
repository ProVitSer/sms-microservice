import { ForbiddenException } from '@nestjs/common';

class ClientNotActiveException extends ForbiddenException {
    constructor(clientId: string) {
        const message = `Клиент ${clientId} отключен`;
        super(message);
    }
}

export default ClientNotActiveException;
