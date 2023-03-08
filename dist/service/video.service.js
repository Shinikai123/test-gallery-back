"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.VideoService = void 0;
const index_1 = require("../index");
const index_2 = require("../entity/index");
const index_3 = require("../entity/index");
const access_1 = require("../utils/access");
const fs = __importStar(require("fs"));
class VideoService {
    uploadVideo(id, title, url, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${id}/${process.env.VIDEO_PATH}`)) {
                fs.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${id}/${process.env.VIDEO_PATH}`);
            }
            const newVideo = yield index_1.dbManager.create(index_2.VideoEntity, { title, url, filename, owner: id });
            const savedVideo = yield index_1.dbManager.save(index_2.VideoEntity, newVideo);
            const getAccess = yield index_1.dbManager.create(index_3.AccessEntity, { user_id: id, video_id: savedVideo.id, access: access_1.AccessEnum.full });
            yield index_1.dbManager.save(index_3.AccessEntity, getAccess);
            return savedVideo;
        });
    }
    deleteVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.dbManager.delete(index_2.VideoEntity, { id });
        });
    }
    getAccess(userId, videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access = yield index_1.dbManager.findOne(index_3.AccessEntity, { where: { user_id: userId, video_id: videoId } });
                if (!access) {
                    const getAccess = yield index_1.dbManager.create(index_3.AccessEntity, { user_id: userId, video_id: videoId, access: "denied" });
                    yield index_1.dbManager.save(index_3.AccessEntity, getAccess);
                }
                return index_1.dbManager.findOne(index_3.AccessEntity, { where: { user_id: userId, video_id: videoId } });
            }
            catch (e) {
                return (e);
            }
        });
    }
    createStream(videoId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield index_1.dbManager.findOne(index_2.VideoEntity, { where: { id: videoId } });
            return fs.createReadStream(`${process.cwd()}/${process.env.STORAGE_PATH}/${userId}/${process.env.VIDEO_PATH}/${video.filename}`);
        });
    }
    userVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoStorage = index_1.dbManager.getRepository(index_2.VideoEntity);
            return yield videoStorage.find({
                where: { owner: { id } },
                order: { id: "DESC" },
            });
        });
    }
    updateVideo(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.dbManager.update(index_2.VideoEntity, { id }, { title });
        });
    }
    updateAccess(userId, videoId, access) {
        return __awaiter(this, void 0, void 0, function* () {
            if (access) {
                const currentAccess = yield index_1.dbManager.findOne(index_3.AccessEntity, {
                    where: { user_id: userId, video_id: videoId },
                });
                if (access === access_1.AccessEnum.denied && currentAccess) {
                    return yield index_1.dbManager.delete(index_3.AccessEntity, currentAccess);
                }
                if (!currentAccess) {
                    const newAccess = yield index_1.dbManager.create(index_3.AccessEntity, {
                        user_id: userId,
                        video_id: videoId,
                        access: access_1.AccessEnum[access],
                    });
                    return yield index_1.dbManager.save(index_3.AccessEntity, newAccess);
                }
                return yield index_1.dbManager.update(index_3.AccessEntity, currentAccess, { access });
            }
        });
    }
}
exports.VideoService = VideoService;
exports.default = new VideoService();
