import { HttpStatus } from '@nestjs/common';

export class UUIDException extends Error {
    message = 'UUID must be a valid UUID format (e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)';
    statusCode = HttpStatus.BAD_REQUEST;
}
