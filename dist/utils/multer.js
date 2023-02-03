"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = (id) => {
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${id}`);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
};
const upload = (id) => (0, multer_1.default)(storage(id));
exports.upload = upload;
