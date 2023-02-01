"use strict";
require('dotenv').config();
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
    migrations: [__dirname + '/src/migration/*.{ts, js}'],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
    }
};
