import { ConflictException } from '@nestjs/common';

class AddNewRangeException extends ConflictException {
    constructor(name: string) {
        const message = `Невозможно добавить новый интервал, так как в данное время перекрывает уже существующий ${name}`;
        super(message);
    }
}

export default AddNewRangeException;
