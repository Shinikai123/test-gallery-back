"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    type: process.env.DB_TYPE,
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1111",
    database: process.env.DB_NAME || "test-gallery",
    synchronize: false,
    entities: [__dirname + '/src/entity/**.entity.{ts,js}'],
    cli: {
        entitiesDir: 'dist/src/**/**.entity.js'
    }
};
