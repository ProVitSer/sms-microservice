import type { PipeTransform, Type } from '@nestjs/common';
import { Param, ParseUUIDPipe } from '@nestjs/common';
import { UUIDException } from '../exceptions/uuid.exeption';

const exceptionFactory = () => new UUIDException();

export const UUIDParam = (property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator => {
    return Param(property, new ParseUUIDPipe({ version: '4', exceptionFactory }), ...pipes);
};
