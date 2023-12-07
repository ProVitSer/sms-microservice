import { NotFoundException } from '@nestjs/common';

class ClientJobsNotFoundException extends NotFoundException {
    constructor(clientId: string) {
        const message = `Задачи по смс рассылки для клиента ${clientId} не найден`;
        super(message);
    }
}

export default ClientJobsNotFoundException;
