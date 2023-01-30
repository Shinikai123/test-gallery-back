"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controller/UserController");
const router = (0, express_1.Router)();
exports.registerUser = router;
const userController = new UserController_1.UserController();
router.post('/register', userController.registerUser);
