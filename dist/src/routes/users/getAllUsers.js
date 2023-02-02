"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controller/UserController");
const auth_middleware_1 = require("../../middleware/auth-middleware");
const router = (0, express_1.Router)();
exports.getAllUsers = router;
const userController = new UserController_1.UserController();
router.get('/users', auth_middleware_1.authMiddleware, userController.getAllUsers);
