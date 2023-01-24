"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserSaveAction_1 = require("./src/controller/UserSaveAction");
const UserGetAllAction_1 = require("./src/controller/UserGetAllAction");
const UserGetByIdAction_1 = require("./src/controller/UserGetByIdAction");
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app["get"]('/users', UserGetAllAction_1.userGetAllAction);
    app["get"]('/user/:id', UserGetByIdAction_1.userGetByIdAction);
    app["post"]('/users', UserSaveAction_1.userSaveAction);
    // run app
    app.listen(8000);
    console.log("Express application is up and running on port 8000");
})).catch(error => console.log("TypeORM connection error: ", error));
