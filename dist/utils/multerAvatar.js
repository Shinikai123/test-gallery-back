"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`)) {
            fs_1.default.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`);
        }
        else {
            fs_extra_1.default.emptyDirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`);
        }
        cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`);
    },
    filename: (req, file, cb) => {
        const name = 'avatar';
        const ext = (0, path_1.extname)(file.originalname);
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Only images with .jpg, .jpeg and .png are allowed"), "");
        }
        else {
            cb(null, `${name}${ext}`);
        }
    },
});
exports.multerUploadAvatar = (0, multer_1.default)({ storage });
