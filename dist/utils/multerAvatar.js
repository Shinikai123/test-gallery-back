"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: './src/avatarStorage',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}/.{jpeg, jpg, png}`);
    },
});
exports.multerUploadAvatar = (0, multer_1.default)({ storage });
