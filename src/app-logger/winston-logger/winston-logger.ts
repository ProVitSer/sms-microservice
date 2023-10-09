import { IAppLogger, LogPayload } from '../interfaces/app-logger.interfaces';
import * as winston from 'winston';
import { Logger, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, printf, splat } = winston.format;
import { ConfigService } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import * as Transport from 'winston-transport';
import { LogLevel } from '../interfaces/app-logger.enum';

export class WinstonLogger implements IAppLogger {
    private logger: Logger;
    constructor() {
        const config = new ConfigService(configuration());
        const getTransport = (logType: LogLevel): Transport => {
            switch (logType) {
                case LogLevel.console:
                    return new winston.transports.Console({
                        format:
                            process.env.NODE_ENV === 'production' ? format.simple() : format.combine(format.colorize(), format.simple()),
                    });
                default:
                    return new winston.transports.DailyRotateFile({
                        dirname: `${config.get('log.path')}`,
                        level: logType,
                        filename: `%DATE%-${logType}.log`,
                        datePattern: `${config.get('log.formatDate')}`,
                        handleExceptions: true,
                        json: true,
                        zippedArchive: false,
                        maxSize: `${config.get('log.maxSize')}`,
                        maxFiles: `${config.get('log.maxFiles')}`,
                    });
            }
        };

        const getTransports = (logTransports: LogLevel[]): Transport[] => {
            return logTransports.map((type: LogLevel) => {
                return getTransport(type);
            });
        };
        this.logger = createLogger({
            format: combine(
                timestamp(),
                splat(),
                printf(({ level, context, message, timestamp, clienId }) => {
                    return `[${level}] [${context}] [${clienId}]  ${timestamp} : ${message}`;
                }),
            ),
            transports: getTransports([LogLevel.console, LogLevel.info, LogLevel.error, LogLevel.debug, LogLevel.warn]),
        });
    }

    log(message: string, payload: LogPayload) {
        this.logger.info(message, { context: payload.context, clienId: payload.clienId });
    }

    info(message: string, payload: LogPayload) {
        this.logger.info(message, payload.clienId, payload.context);
    }

    error(message: string, payload: LogPayload) {
        this.logger.error(message, payload.clienId, payload.context);
    }

    warn(message: string, payload: LogPayload) {
        this.logger.warn(message, payload.clienId, payload.context);
    }

    debug(message: string, payload: LogPayload) {
        this.logger.debug(message, payload.clienId, payload.context);
    }
}
