import { IAppLogger, LogPayload } from '../interfaces/app-logger.interfaces';
import * as winston from 'winston';
import { Logger, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, printf, splat } = winston.format;
import { ConfigService } from '@nestjs/config';
import configuration from '@app/config/config.provider';

export class WinstonLogger implements IAppLogger {
    private logger: Logger;
    constructor() {
        const config = new ConfigService(configuration());
        this.logger = createLogger({
            format: combine(
                timestamp(),
                splat(),
                printf(({ level, context, message, timestamp }) => {
                    return ` ${timestamp} [${context}] ${level}: ${JSON.stringify(message)}`;
                }),
            ),
            transports: [
                new winston.transports.Console({
                    format: process.env.NODE_ENV === 'production' ? format.simple() : format.combine(format.colorize(), format.simple()),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.get('log.path')}`,
                    filename: `%DATE%.log`,
                    datePattern: `${config.get('log.formatDate')}`,
                    handleExceptions: true,
                    json: true,
                    zippedArchive: false,
                    maxSize: `${config.get('log.maxSize')}`,
                    maxFiles: `${config.get('log.maxFiles')}`,
                }),
            ],
        });
    }

    log(message: string, payload: LogPayload = {}) {
        this.logger.info(message, payload);
    }

    info(message: string, payload: LogPayload = {}) {
        this.logger.info(message, payload);
    }

    error(message: string, payload: LogPayload = {}) {
        this.logger.error(message, payload);
    }

    warn(message: string, payload: LogPayload = {}) {
        this.logger.warn(message, payload);
    }

    debug(message: string, payload: LogPayload = {}) {
        this.logger.debug(message, payload);
    }
}
