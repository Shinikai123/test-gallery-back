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
const index_1 = require("../index");
const index_2 = require("../entity/index");
class TokenService {
    generateTokens(user) {
        const payload = {
            id: user.id,
            user_name: user.user_name,
            user_email: user.user_email,
            avatar: `${process.env.DOMAIN}/users/avatar/${user.id}`,
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: '21d' });
        return {
            accessToken,
            expires_in: '1800000',
            refreshToken
        };
    }
    saveToken(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = user;
            const TokenData = yield index_1.dbManager.findOne(index_2.TokenEntity, { where: { user: { id } } });
            if (TokenData) {
                yield index_1.dbManager.update(index_2.TokenEntity, { user: { id } }, { token });
            }
            else {
                const newToken = index_1.dbManager.create(index_2.TokenEntity, { user, token });
                yield index_1.dbManager.save(index_2.TokenEntity, newToken);
            }
        });
    }
    validateAccessToken(token) {
        try {
            // eslint-disable-next-line no-undef
            const userData = jwt.verify(token, process.env.JWT_SECRET || '');
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            // eslint-disable-next-line no-undef
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '');
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    removeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const TokenData = yield index_1.dbManager.delete(index_2.TokenEntity, { token });
            return TokenData;
        });
    }
    findToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield index_1.dbManager.findOne(index_2.TokenEntity, { where: { token } });
            return tokenData;
        });
    }
}
exports.TokenService = TokenService;
