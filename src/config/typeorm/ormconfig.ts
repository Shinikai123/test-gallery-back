/* eslint-disable no-undef */
import { ConnectionOptions } from "typeorm";
require('dotenv').config();

export const ORMConfig =  {
  type: process.env.DB_TYPE,
  schema: process.env.DB_SCHEMA,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1111",
  database: process.env.DB_NAME || "test-gallery",
  synchronize: true,
  entities: [__dirname + '/src/entity/**.entity.{ts,js}'],
} as ConnectionOptions