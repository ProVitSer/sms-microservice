import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Utils } from './utils/utils';

async function bootstrap() {
    const config = new ConfigService(configuration());
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.map((error) => {
                    if (!!error.constraints) {
                        return {
                            field: error.property,
                            error: error.constraints,
                        };
                    } else if (Array.isArray(error.children) && error.children.length > 0) {
                        return Utils.formatError(error);
                    }
                });
                return new HttpException(messages.length > 1 ? messages : messages[0], HttpStatus.BAD_REQUEST);
            },
        }),
    );
    await app.listen(config.get('app.port'));
}
bootstrap();
