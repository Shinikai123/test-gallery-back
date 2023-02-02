import { dbManager } from "../../index";
import {Video} from "../entity/Video.entity";
import {upload} from "../utils/multer";

export class VideoService {
    async uploadVideo(id: string){
        return upload(id)
    }
}