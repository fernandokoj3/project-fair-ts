import dotenv from 'dotenv';
import { resolve } from 'path';

const environmment = process.env.ENVIRONMENT ?? 'local';

if (environmment) {
  const path = resolve(__dirname, `../../../environments/.env.${environmment}`);
  dotenv.config({ path });
} else {
  dotenv.config();
}

export const DATABASE = Object.freeze({
  NAME: process.env.APP_DATABASE_NAME,
  USER: process.env.APP_DATABASE_USER,
  PWD: process.env.APP_DATABASE_PWD,
  HOST: process.env.APP_DATABASE_HOST,
  PORT: Number.parseInt(process.env.APP_DATABASE_PORT as any),
  TYPE: process.env.APP_DATABASE_TYPE as any,
  SYNCHRONIZE: process.env.APP_DATABASE_SYNCHRONIZE === 'true',
  LOGGING: process.env.ENVIRONMENT === 'local',
});
export const BASE_PATH = '/'
export const PAGINATION = Object.freeze({
  MAX_LIMIT_SIZE : 100,
  MIN_PAGE_SIZE : 0,
  MIN_START_PAGE : 1,
  DEFAULT_SORT: 'DESC',
})
