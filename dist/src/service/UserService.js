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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_entity_1 = require("../entity/User.entity");
const index_1 = require("../../index");
const TokenService_1 = require("./TokenService");
const bcrypt_1 = require("../utils/bcrypt");
const tokenService = new TokenService_1.TokenService();
class UserService {
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new Error('auth error (!refreshToken)');
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDB = yield tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDB) {
                throw new Error('auth error (!userData || !tokenFromDB)');
            }
            const { id } = userData;
            const user = yield index_1.dbManager.findOne(User_entity_1.User, { where: { id } });
            const tokens = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), user);
        });
    }
    registerUser(userName, userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            const user = index_1.dbManager.create(User_entity_1.User, { userName, userEmail, password: hashedPassword });
            const { accessToken, refreshToken, expires_in } = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, refreshToken);
            return Object.assign(Object.assign({}, user), { refreshToken, accessToken, expires_in });
        });
    }
    loginUser(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.dbManager.findOne(User_entity_1.User, { where: { userEmail } });
            if (!user) {
                return { error: 'User not found' };
            }
            const isValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!isValid) {
                return { error: 'check out your password' };
            }
            const tokens = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, tokens.refreshToken);
            return Object.assign({ id: user.id, userName: user.user_name, userEmail: user.user_email }, tokens);
        });
    }
    logoutUser(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tokenService.removeToken(refreshToken);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.dbManager.find(User_entity_1.User);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_1.dbManager.findOne(User_entity_1.User, { where: { id } });
                return user.user_name;
            }
            catch (e) {
                return { error: e.message };
            }
        });
    }
}
exports.UserService = UserService;
