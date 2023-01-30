import { ConnectionOptions } from "typeorm";
import dotenv from 'dotenv';
dotenv.config()

export default {
  type: process.env.DB_TYPE,
  schema: process.env.DB_SCHEMA,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1111",
  database: process.env.DB_NAME || "test-gallery",
  synchronize: true,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
} as ConnectionOptions