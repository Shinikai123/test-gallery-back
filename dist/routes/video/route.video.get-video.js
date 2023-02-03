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
exports.getVideo = void 0;
const express_1 = require("express");
const index_1 = require("../../index");
const index_2 = require("../../entity/index");
const router = (0, express_1.Router)();
exports.getVideo = router;
router.get('/users/:id/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const videoRepository = index_1.dbManager.getRepository(index_2.VideoEntity);
    const videos = yield videoRepository.find({
        where: { owner: { id } },
    });
    return res.sendStatus(200).json(videos);
}));
