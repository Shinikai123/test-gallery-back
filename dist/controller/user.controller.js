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
exports.UserController = void 0;
const __1 = require("..");
const index_1 = require("../entity/index");
// import {TokenService} from "../service/token.service";
const user_service_1 = require("../service/user.service");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import { userRepository } from "../repositories";
// const tokenService = new TokenService();
const userService = new user_service_1.UserService();
class UserController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, user_email, password, } = req.body;
                const compareUser = yield __1.dbManager.findOne(index_1.UserEntity, { where: { user_email } });
                if (compareUser) {
                    return res.send({ error: 'User with this email already exists' });
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
    uploadAvatar(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            if (!userId) {
                res.sendStatus(401).json({ error: ` ${userId}` });
            }
            else {
                try {
                    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                    const url = `${process.cwd()}/${process.env.AVATAR_PATH}/${userId}/${filename}`;
                    const savedAvatar = yield userService.uploadAvatar(userId, url);
                    res.json(savedAvatar);
                }
                catch (e) {
                    next(e);
                    res.sendStatus(401);
                }
            }
        });
    }
    getAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatarPath = path_1.default.join(__dirname, `../avatarStorage/`);
            try {
                const readStream = yield fs_1.default.createReadStream(avatarPath);
                readStream.pipe(res);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.UserController = UserController;
