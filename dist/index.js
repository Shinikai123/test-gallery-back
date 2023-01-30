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
exports.dbManager = exports.dbConnection = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const body_parser_1 = require("body-parser");
const registerUser_1 = require("./src/routes/users/registerUser");
const loginUser_1 = require("./src/routes/users/loginUser");
const logoutUser_1 = require("./src/routes/users/logoutUser");
const getAllUsers_1 = require("./src/routes/users/getAllUsers");
const getUser_1 = require("./src/routes/users/getUser");
const getTokens_1 = require("./src/routes/token/getTokens");
const refresh_1 = require("./src/routes/token/refresh");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const cors = require('cors');
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
const getDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let dbConnection;
    try {
        console.log(ormconfig_1.default);
        dbConnection = yield (0, typeorm_1.createConnection)(ormconfig_1.default);
        app.use(cors({
            allowedHeaders: ['localhost:8000']
        }));
        app.use(registerUser_1.registerUser);
        app.use(getAllUsers_1.getAllUsers);
        app.use(loginUser_1.loginUser);
        app.use(logoutUser_1.logoutUser);
        app.use(getTokens_1.getTokens);
        app.use(refresh_1.refreshToken);
        app.use(getUser_1.getUser);
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, body_parser_1.json)());
        app.listen(PORT);
        console.log(`Server is running at http://localhost:${PORT}`);
    }
    catch (err) {
        (err.message);
    }
    return dbConnection;
    // register all application routes
    // AppRoutes.forEach(route => {
    //     app[route.method](route.path, (request: Request, response: Response, next: Function) => {
    //         route.action(request, response)
    //             .then(() => next)
    //             .catch(err => next(err));
    //     });
    // });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.dbConnection = yield getDBConnection();
    exports.dbManager = exports.dbConnection.manager;
}))();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
