"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controller/user.controller");
const router = (0, express_1.Router)();
exports.refreshToken = router;
const userController = new user_controller_1.UserController();
router.get('/refresh', userController.refresh);
