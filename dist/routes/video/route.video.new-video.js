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
exports.newVideo = void 0;
const index_1 = require("../../index");
const index_2 = require("../../entity/index");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.newVideo = router;
router.post('/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, url, isPrivate, ovner } = req.body;
    const video = yield index_1.dbManager.save(index_2.VideoEntity, { title, url, isPrivate, ovner });
    return res.json(video);
}));
