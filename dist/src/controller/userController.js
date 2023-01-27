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
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entity/User.entity");
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    constructor() {
        this.userRepository = (0, typeorm_1.getRepository)(User_entity_1.User);
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.createUser(req.body);
                res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService_1.default.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.getOneUser(req.params.id);
                return res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield UserService_1.default.updateUser(req.body);
                return res.json(updatedUser);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.createUser(req.params.id);
                return res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
}
exports.default = new UserController();
