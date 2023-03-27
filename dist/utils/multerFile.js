"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if(!fs.existsSync
//             (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`)){
//                 fs.mkdirSync
//                 (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`);
//             } else {
//                 fsExtra.emptyDirSync(
//                     `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`
//                 )
//             }
//         if(!fs.existsSync(
//             `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}` 
//         )){
//             fs.mkdirSync
//             (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`);
//         }
//     if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
//         cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`)
//     }
//     if(file.originalname.match(/\.(mp4|avi|webm)$/)){
//         cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`)
//     }
//     },
//     filename:(req, file, cb) => {
//         const name = "avatar";
//         const ext = extname(file.originalname);
//         if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
//             cb(null, `${name}${ext}`)
//         }
//         if(file.originalname.match(/\.(mp4|avi|webm)$/)){
//             cb(null, `${Date.now()}-${file.originalname}`);
//         }
//     }
// });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("storage");
        console.log(req.params);
        if (!fs_1.default.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}`)) {
            fs_1.default.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}`);
        }
        cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}`);
    },
    filename: (req, file, cb) => {
        const ext = (0, path_1.extname)(file.originalname);
        // try{
        //     fs.unlinkSync(`avatar${ext}`);
        // } catch (error) {
        //     console.log(error);
        // }
        // if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        //     return cb(new Error(`incorrect file extension`), "")
        // } else {
        //     cb(null, `avatar${ext}`);
        // }
        // if(file.originalname.match(/\.(mp4|avi|webm)$/)){
        //     cb(null, `${file.originalname}`)
        // }
        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(null, `avatar${ext}`);
        }
        else {
            cb(null, `${file.originalname}`);
        }
    }
});
exports.multerFile = (0, multer_1.default)({ storage });
