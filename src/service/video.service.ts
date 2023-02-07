import { dbManager } from "../index";
import {VideoEntity} from "../entity/index";
import { AccessEntity } from "../entity/index";
import {upload} from "../utils/multer";

export class VideoService {
    async uploadVideo(id: string){
        return upload(id)
    }
}