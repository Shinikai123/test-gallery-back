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
const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next('Ошибка при валидации', errors.array());
                }
                const { nickname, email, password } = req.body;
                const userData = yield userService.registration(nickname, email, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, email, password } = req.body;
                const userData = yield userService.login(nickname, email, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.json(token);
            }
            catch (e) {
                next(e);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                yield userService.activate(activationLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUsers(req, res, next) {
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
}
exports.UserController = UserController;