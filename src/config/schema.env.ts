/* eslint-disable no-undef */
import * as dotenv from 'dotenv';
dotenv.config();

export class EnvSchema{
    static PORT = process.env.PORT;
    static DB_USER = process.env.DB_USER;
    static DB_HOST = process.env.DB_HOST;
    static DB_NAME = process.env.DB_NAME;
    static DB_PASSWORD = process.env.DB_PASSWORD;
    static DB_PORT = process.env.DB_PORT;
    static DB_TYPE = process.env.DB_TYPE;
    static DB_SCHEMA = process.env.DB_SCHEMA;
    static JWT_SECRET = process.env.JWT_SECRET;
    static REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
    static STORAGE_PATH = process.env.STORAGE_PATH
    }
    