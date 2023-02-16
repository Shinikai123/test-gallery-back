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
exports.uploadVideo = void 0;
const express_1 = require("express");
const multer_1 = require("../../utils/multer");
const router = (0, express_1.Router)();
exports.uploadVideo = router;
router.post('/upload/:id', multer_1.upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { id } = req.params;
    if (!title || !id) {
        res.sendStatus(401).json({ error: `${title} - ${id}` });
    }
    else {
        // @ts-ignore
        console.log(req.file);
        res.json({ message: "success" });
    }
}));
