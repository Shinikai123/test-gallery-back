"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./entity/User.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1111",
    database: "test-gallery",
    synchronize: true,
    logging: false,
    entities: [User_entity_1.User],
    migrations: [],
});
