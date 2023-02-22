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
const __1 = require("..");
const index_1 = require("../entity/index");
const token_service_1 = require("../service/token.service");
const user_service_1 = require("../service/user.service");
const tokenService = new token_service_1.TokenService();
const userService = new user_service_1.UserService();
class UserController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, user_email, password } = req.body;
                const compareUser = yield __1.dbManager.findOne(index_1.UserEntity, { where: { user_email } });
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
    uploadAvatar(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { avatar } = req.body;
            const { user_id } = req.params;
            if (!avatar || !user_id) {
                res.sendStatus(401).json({ error: `${avatar} - ${user_id}` });
            }
            else {
                try {
                    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                    const avatar = `${process.cwd()}/${process.env.AVATAR_PATH}/`;
                    const uploadedVideo = yield userService.uploadAvatar({ user_id, avatar, filename });
                    res.json(uploadedVideo);
                }
                catch (e) {
                    next(e);
                    console.log(e);
                    res.sendStatus(401);
                }
            }
        });
    }
    deleteAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { avatar } = req.params;
            try {
                const deletedAvatar = yield userService.deleteAvatar(avatar);
                res.json(deletedAvatar);
            }
            catch (e) {
                next(e);
                res.sendStatus(401);
            }
        });
    }
    getAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userAvatar = yield userService.getAvatarById(id);
                if (userAvatar.err) {
                    return res.json({ err: "User not found" });
                }
                return res.json({ id, avatar: userAvatar });
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            const { avatar } = req.body;
            yield userService.updateAvatar(user_id, avatar);
            return res.sendStatus(200);
        });
    }
}
exports.UserController = UserController;
