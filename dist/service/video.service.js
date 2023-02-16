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
exports.VideoService = void 0;
const index_1 = require("../index");
const index_2 = require("../entity/index");
const index_3 = require("../entity/index");
class VideoService {
    uploadVideo(id, title, url, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVideo = yield index_1.dbManager.create(index_2.VideoEntity, { title, url, filename, owner: id });
            const savedVideo = yield index_1.dbManager.save(index_2.VideoEntity, newVideo);
            const getAccess = yield index_1.dbManager.create(index_3.AccessEntity, { user_id: id, video_id: savedVideo.id, access: "granted" });
            yield index_1.dbManager.save(index_3.AccessEntity, getAccess);
            return savedVideo;
        });
    }
    deleteVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.dbManager.delete(index_2.VideoEntity, { id });
        });
    }
    getAccess(user_id, video_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access = yield index_1.dbManager.findOne(index_3.AccessEntity, { where: { user_id: user_id, video_id: video_id } });
                if (!access) {
                    const getAccess = yield index_1.dbManager.create(index_3.AccessEntity, { user_id: user_id, video_id: video_id, access: "denied" });
                    yield index_1.dbManager.save(index_3.AccessEntity, getAccess);
                }
                return index_1.dbManager.findOne(index_3.AccessEntity, { where: { user_id: user_id, video_id: video_id } });
            }
            catch (e) {
                return (e);
            }
        });
    }
}
exports.VideoService = VideoService;
exports.default = new VideoService();
