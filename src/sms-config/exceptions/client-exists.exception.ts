import { ConflictException } from '@nestjs/common';

class ClientIdExistsException extends ConflictException {
    constructor(clientId: string) {
        const message = `Пользователь с id ${clientId} уже пристутвует в базе. Нужно удалить его или обновить информацию`;
        super(message);
    }
}

export default ClientIdExistsException;
