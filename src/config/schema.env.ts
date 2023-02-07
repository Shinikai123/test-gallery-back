/* eslint-disable no-undef */
import { Expose } from 'class-transformer';
import { IsString,IsNumber } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class EnvSchema{
    @Expose()
    @IsNumber()
    PORT: number;

    @Expose()
    @IsString()
    DB_USER: string;

    @Expose()
    @IsString()
    DB_HOST : string;

    @Expose()
    @IsString()
    DB_NAME: string;

    @Expose()
    @IsString()
    DB_PASSWORD: string;

    @Expose()
    @IsNumber()
    DB_PORT: number;

    @Expose()
    @IsString()
    DB_TYPE : string;

    @Expose()
    @IsString()
    DB_SCHEMA : string;

    @Expose()
    @IsString()
    JWT_SECRET : string;

    @Expose()
    @IsString()
    REFRESH_TOKEN_SECRET : string;
}
