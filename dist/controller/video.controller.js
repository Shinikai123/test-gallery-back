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
exports.VideoController = void 0;
const __1 = require("..");
const entity_1 = require("../entity");
const video_service_1 = require("../service/video.service");
const videoService = new video_service_1.VideoService();
class VideoController {
    uploadVideo(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const { id } = req.params;
            if (!title || !id) {
                res.sendStatus(401).json({ error: `${title} - ${id}` });
            }
            else {
                try {
                    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                    const url = `${process.cwd()}/${process.env.STORAGE_PATH}/${id}/`;
                    const uploadedVideo = yield videoService.uploadVideo(id, title, url, filename);
                    res.json(uploadedVideo);
                }
                catch (e) {
                    next(e);
                    console.log(e);
                    res.sendStatus(401);
                }
            }
        });
    }
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const videoStorage = __1.dbManager.getRepository(entity_1.VideoEntity);
            const videos = yield videoStorage.find({
                where: { owner: { id } },
                order: { id: 'DESC' }
            });
            return res.json(videos);
        });
    }
    deleteVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedVideo = yield videoService.deleteVideo(id);
                res.json(deletedVideo);
            }
            catch (e) {
                next(e);
                res.sendStatus(401);
            }
        });
    }
    getAccess(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { video_id } = req.query;
            try {
                const access = yield videoService.getAccess(id, video_id);
                console.log(access);
                res.json(access);
            }
            catch (e) {
                next(e);
                res.status(401);
            }
        });
    }
    updateVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title } = req.body;
            yield videoService.updateVideo(id, title);
            return res.sendStatus(200);
        });
    }
    setAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { video_id, access } = req.body;
            console.log(id);
            yield videoService.updateAccess(id, video_id, access);
            return res.sendStatus(200);
        });
    }
}
exports.VideoController = VideoController;
exports.default = new VideoController();
