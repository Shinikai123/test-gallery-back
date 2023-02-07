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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controller/user.controller");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
exports.uploadVideo = router;
const userController = new user_controller_1.UserController();
const videoStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // eslint-disable-next-line no-undef
        cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ videoStorage });
router.post('/upload/:id', upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
