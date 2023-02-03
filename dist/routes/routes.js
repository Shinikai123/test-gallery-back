"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const route_token_get_tokens_1 = require("./token/route.token.get-tokens");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/register', userController.registerUser),
    router.post('/login', userController.loginUser),
    router.get('/logout', userController.logoutUser),
    router.get('/users', userController.getAllUsers),
    router.get('/users/:id', userController.getUser),
    router.get('/refresh', userController.refresh),
    router.get('/tokens', route_token_get_tokens_1.getTokens);
exports.default = router;
