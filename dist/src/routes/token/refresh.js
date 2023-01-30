"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controller/UserController");
const router = (0, express_1.Router)();
exports.refreshToken = router;
const userController = new UserController_1.UserController();
router.get('/refresh', userController.refresh);
