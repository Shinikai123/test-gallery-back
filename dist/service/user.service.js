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
const index_1 = require("../entity/index");
const index_2 = require("../index");
const token_service_1 = require("./token.service");
const bcrypt_1 = require("../utils/bcrypt");
const tokenService = new token_service_1.TokenService();
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
            const user = yield index_2.dbManager.findOne(index_1.UserEntity, { where: { id } });
            const tokens = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), user);
        });
    }
    registerUser(user_name, user_email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            const user = index_2.dbManager.create(index_1.UserEntity, { user_name, user_email, password: hashedPassword });
            yield index_2.dbManager.save(user);
            const { accessToken, refreshToken, expires_in } = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, refreshToken);
            return Object.assign(Object.assign({}, user), { refreshToken, accessToken, expires_in });
        });
    }
    loginUser(user_email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_2.dbManager.findOne(index_1.UserEntity, { where: { user_email } });
            if (!user) {
                return { error: 'User not found' };
            }
            const isValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!isValid) {
                return { error: 'check out your password' };
            }
            const tokens = tokenService.generateTokens(user);
            yield tokenService.saveToken(user, tokens.refreshToken);
            return Object.assign({ id: user.id, user_name: user.user_name, user_email: user.user_email }, tokens);
        });
    }
    logoutUser(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield tokenService.removeToken(refreshToken);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_2.dbManager.find(index_1.UserEntity);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_2.dbManager.findOne(index_1.UserEntity, { where: { id } });
                return user.user_name;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAvatarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_2.dbManager.findOne(index_1.UserEntity, { where: { id } });
                return user.avatar;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    uploadAvatar(avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAvatar = yield index_2.dbManager.create(index_1.UserEntity, { avatar });
            const savedAvatar = yield index_2.dbManager.save(index_1.UserEntity, newAvatar);
            return savedAvatar;
        });
    }
    deleteAvatar(avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_2.dbManager.delete(index_1.UserEntity, { avatar });
        });
    }
    updateAvatar(id, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_2.dbManager.delete(index_1.UserEntity, { avatar });
            }
            catch (e) {
                console.log(e);
            }
            finally {
                yield index_2.dbManager.update(index_1.UserEntity, { avatar });
            }
        });
    }
}
exports.UserService = UserService;
