import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class GlobalValidationPipe extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = ValidationExceptionFactory(errors);
                return new RpcException(new ValidationException(messages));
            },
        });
    }
}

export class ValidationException extends BadRequestException {
    constructor(message: any) {
        super(message);
    }
}

export const ValidationExceptionFactory = (validationErrors: ValidationError[]) => {
    const formattedErrors = [];
    formatErrors(validationErrors, formattedErrors);
    return formattedErrors;
};

function formatErrors(validationErrors: ValidationError[], formattedErrors: any[]) {
    return validationErrors.map((err) => {
        for (const property in err.constraints) {
            formattedErrors.push({
                message: err.constraints[property],
                field: err.property,
                from: err.target.constructor.name,
            });
        }
        if (Array.isArray(err.children)) {
            formatErrors(err.children, formattedErrors);
        }
    });
}
