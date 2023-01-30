"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router.post('/register', userController.registerUser),
    router.post('/login', userController.loginUser),
    router.get('/logout', userController.logoutUser),
    router.get('/users', userController.getAllUsers),
    router.get('/users/:id', userController.getUser),
    router.get('/refresh', userController.refresh);
exports.default = router;
