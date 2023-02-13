import { dbManager } from "../index";
import {VideoEntity} from "../entity/index";
import { AccessEntity } from "../entity/index";

export class VideoService {
    async uploadVideo(id, title, url, filename){
        const newVideo = await dbManager.create(VideoEntity, {title, url, filename, owner: id});
        const savedVideo = await dbManager.save(VideoEntity, newVideo);

        const grantAccess = await dbManager.create(AccessEntity, {user_id: id, video_id: savedVideo.id, access: "granted" });
        await dbManager.save(AccessEntity, grantAccess);

        return savedVideo
    }

    async deleteVideo(id) {
        return dbManager.delete(VideoEntity, {id})
    }

    async getAccess(user_id : string, video_id: any) {
        try{
            const access = await dbManager.findOne(AccessEntity, {where: {user_id : user_id, video_id : video_id}})
            if(!access) {
                const grantAccess = await dbManager.create(AccessEntity, {user_id: user_id, video_id: video_id, access: "denied"});
                await dbManager.save(AccessEntity, grantAccess);
            }
            return dbManager.findOne(AccessEntity, {where: {user_id : user_id, video_id : video_id}});
        } catch(e) {
            return(e)
        }
    }
}

export default new VideoService();