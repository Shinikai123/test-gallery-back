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
exports.UserController = void 0;
const __1 = require("../..");
const User_entity_1 = require("../entity/User.entity");
const TokenService_1 = require("../service/TokenService");
const UserService_1 = require("../service/UserService");
const tokenService = new TokenService_1.TokenService();
const userService = new UserService_1.UserService();
class UserController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, user_email, password } = req.body;
                const compareUser = yield __1.dbManager.findOne(User_entity_1.User, { where: { user_email } });
                if (compareUser) {
                    return res.status(409).send({ error: 'User with this email already exists' });
                }
                const userData = yield userService.registerUser(user_name, user_email, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(201).send(Object.assign({}, userData));
            }
            catch (e) {
                next(e);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email, password } = req.body;
                const userData = yield userService.loginUser(user_email, password);
                // @ts-ignore
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies.refreshToken;
                const token = yield userService.logoutUser(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(200).json(token);
            }
            catch (e) {
                next();
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                const userData = yield userService.refreshToken(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userData = yield userService.getUserById(id);
                if (userData.err) {
                    return res.json({ err: "User not found" });
                }
                return res.json({ id, user_email: userData });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
