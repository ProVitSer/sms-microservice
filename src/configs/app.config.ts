import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
    APP_ADDRESS: Joi.string().default('0.0.0.0'),
});

export const appConfig = registerAs('app', () => ({
    address: process.env.APP_ADDRESS,
}));
