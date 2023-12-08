import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const rmqMicroserviceConfigSchema = Joi.object({
    RMQ_URL: Joi.string(),
    SMS_SERVICE_QUEUE: Joi.string(),
});

export const rmqMicroserviceConfig = registerAs('rmq', () => ({
  url: process.env.RMQ_URL,
  queue: process.env.SMS_SERVICE_QUEUE,
}));
