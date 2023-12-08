import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const typeormConfig = registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  migrationsRun: Boolean(process.env.MIGRATIONS_RUN),

}));

export const typeOrmConfigSchema = Joi.object({
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number(),
  POSTGRES_DB: Joi.string(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  MIGRATIONS_RUN: Joi.boolean()
})
