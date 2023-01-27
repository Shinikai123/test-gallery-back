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
const User_entity_1 = require("../entity/User.entity");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield User_entity_1.User.create(user);
            return createdUser;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_entity_1.User.find();
            return users;
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('не указан ID');
            }
            const user = yield User_entity_1.User.findById(id);
            return user;
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.id) {
                throw new Error('не указан ID');
            }
            const updatedUser = yield User_entity_1.User.findByIdAndUpdate(user.id, user, { new: true });
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('не указан ID');
            }
            const user = yield User_entity_1.User.findByIdAndDelete(id);
            return user;
        });
    }
}
exports.default = new UserService();
