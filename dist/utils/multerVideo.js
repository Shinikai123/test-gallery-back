"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadVideo = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`)) {
            fs_1.default.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`);
        }
        cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.multerUploadVideo = (0, multer_1.default)({ storage });
