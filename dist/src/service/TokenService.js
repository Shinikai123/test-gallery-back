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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../../index");
const Token_entity_1 = require("../entity/Token.entity");
class TokenService {
    generateTokens(user) {
        const payload = {
            id: user.id,
            userName: user.user_name,
            userEmail: user.user_email
        };
        const accessToken = jwt.sign(payload, "1234-abcd-5678-efgh", { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, "1234-abcd-5678-efgh", { expiresIn: '21d' });
        return {
            accessToken,
            expires_in: '1800000',
            refreshToken
        };
    }
    saveToken(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = user;
            const TokenData = yield index_1.dbManager.findOne(Token_entity_1.Token, { where: { user: { id } } });
            if (TokenData) {
                yield index_1.dbManager.update(Token_entity_1.Token, { user: { id } }, { token });
            }
            else {
                const newToken = index_1.dbManager.create(Token_entity_1.Token, { user, token });
                yield index_1.dbManager.save(Token_entity_1.Token, newToken);
            }
        });
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET || '');
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '');
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    removeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const TokenData = yield index_1.dbManager.delete(Token_entity_1.Token, { token });
            return TokenData;
        });
    }
    findToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield index_1.dbManager.findOne(Token_entity_1.Token, { where: { token } });
            return tokenData;
        });
    }
}
exports.TokenService = TokenService;
