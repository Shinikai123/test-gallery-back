"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { registerUser } from './src/routes/users/registerUser';
// import { loginUser } from './src/routes/users/loginUser';
// import { logoutUser } from './src/routes/users/logoutUser';
// import { getAllUsers } from './src/routes/users/getAllUsers';
// import { getUser } from './src/routes/users/getUser';
// import { getTokens } from './src/routes/token/getTokens';
// import { refreshToken } from './src/routes/token/refresh';
const ormconfig_1 = __importDefault(require("./ormconfig"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const dotenv = __importStar(require("dotenv"));
const cors = require('cors');
dotenv.config();
const getDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let dbConnection;
    try {
        dbConnection = yield (0, typeorm_1.createConnection)(ormconfig_1.default);
        app.use(cors({
            allowedHeaders: ['localhost:8000']
        }));
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, body_parser_1.json)());
        app.use((0, cookie_parser_1.default)());
        console.log(process.env.JWT_SECRET);
        app.use(routes_1.default);
        // app.use(registerUser);
        // app.use(getAllUsers);
        // app.use(loginUser);
        // app.use(logoutUser);
        // app.use(getTokens);
        // app.use(refreshToken);
        // app.use(getUser);
        app.listen(PORT);
        console.log(`Server is running at http://localhost:${PORT}`);
    }
    catch (err) {
        (err.message);
    }
    return dbConnection;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.dbConnection = yield getDBConnection();
    exports.dbManager = exports.dbConnection.manager;
}))();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
