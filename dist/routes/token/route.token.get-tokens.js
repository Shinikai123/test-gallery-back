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
exports.getTokens = void 0;
const express_1 = require("express");
const index_1 = require("../../index");
const index_2 = require("../../entity/index");
const router = (0, express_1.Router)();
exports.getTokens = router;
router.get('/tokens', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.dbManager.find(index_2.TokenEntity);
    return res.status(200).json(users);
}));
