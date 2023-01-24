"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const UserGetAllAction_1 = require("./controller/UserGetAllAction");
const UserGetByIdAction_1 = require("./controller/UserGetByIdAction");
const UserSaveAction_1 = require("./controller/UserSaveAction");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: UserGetAllAction_1.userGetAllAction
    },
    {
        path: "/user/:id",
        method: "get",
        action: UserGetByIdAction_1.userGetByIdAction
    },
    {
        path: "/users",
        method: "post",
        action: UserSaveAction_1.userSaveAction
    }
];
