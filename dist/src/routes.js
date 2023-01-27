"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const router = (0, express_1.default)();
router.post('/users', UserController_1.default.createUser);
router.get('/users', UserController_1.default.getAllUsers);
router.get('/users/:id', UserController_1.default.getOneUser);
router.put('/users', UserController_1.default.updateUser);
router.delete('/users/:id', UserController_1.default.deleteUser);
exports.default = router;
