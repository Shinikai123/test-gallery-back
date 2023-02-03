"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controller/user.controller");
const router = (0, express_1.Router)();
exports.registerUser = router;
const userController = new user_controller_1.UserController();
router.post('/register', userController.registerUser);
