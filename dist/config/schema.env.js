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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvSchema = void 0;
/* eslint-disable no-undef */
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class EnvSchema {
    constructor() {
        this.PORT = process.env.PORT || 8000;
        this.DB_USER = process.env.DB_USER;
        this.DB_HOST = process.env.DB_HOST;
        this.DB_NAME = process.env.DB_NAME;
        this.DB_PASSWORD = process.env.DB_PASSWORD;
        this.DB_PORT = process.env.DB_PORT;
        this.DB_TYPE = process.env.DB_TYPE;
        this.DB_SCHEMA = process.env.DB_SCHEMA;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
        this.STORAGE_PATH = process.env.STORAGE_PATH;
    }
}
exports.EnvSchema = EnvSchema;
