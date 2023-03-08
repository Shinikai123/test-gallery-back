import { dbManager } from "../index";
import {VideoEntity} from "../entity/index";
import { AccessEntity } from "../entity/index";
import { AccessEnum } from "../utils/access";
import * as fs from "fs"

export class VideoService {
    async uploadVideo(id, title, url, filename){
        if(!fs.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${id}/${process.env.VIDEO_PATH}`))
        {
            fs.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${id}/${process.env.VIDEO_PATH}`)
        }

        const newVideo = await dbManager.create(VideoEntity, {title, url, filename, owner: id});
        const savedVideo = await dbManager.save(VideoEntity, newVideo);

        const getAccess = await dbManager.create(AccessEntity, {user_id: id, video_id: savedVideo.id, access: AccessEnum.full });
        await dbManager.save(AccessEntity, getAccess);

        return savedVideo
    }

    async deleteVideo(id) {
        return dbManager.delete(VideoEntity, {id})
    }

    async getAccess(userId, videoId) {
        try{
            const access = await dbManager.findOne(AccessEntity, {where: {user_id : userId, video_id : videoId}})
            if(!access) {
                const getAccess = await dbManager.create(AccessEntity, {user_id: userId, video_id: videoId, access: "denied"});
                await dbManager.save(AccessEntity, getAccess);
            }
            return dbManager.findOne(AccessEntity, {where: {user_id : userId, video_id : videoId}});
        } catch(e) {
            return(e)
        }
    }

    
  async createStream(videoId, userId) {
    const video = await dbManager.findOne(VideoEntity, { where: { id: videoId } });
    return fs.createReadStream( 
        `${process.cwd()}/${process.env.STORAGE_PATH}/${userId}/${process.env.VIDEO_PATH}/${video.filename}`
    );
  }

    async userVideo(id) {
        const videoStorage = dbManager.getRepository(VideoEntity);
        return await videoStorage.find({
            where: {owner: {id}},
            order: {id: "DESC"},
        });
    }

    async updateVideo(id, title) {
        return await dbManager.update(VideoEntity, {id}, { title});
    }

    async updateAccess(userId, videoId, access) {
        if(access) {
            const currentAccess = await dbManager.findOne( AccessEntity, {
                where: {user_id : userId, video_id: videoId},
            });
            if(access === AccessEnum.denied && currentAccess) {
                return await dbManager.delete(AccessEntity, currentAccess)
            }
            if(!currentAccess) {
                const newAccess = await dbManager.create(AccessEntity, {
                    user_id: userId,
                    video_id: videoId,
                    access: AccessEnum[access],
                });
                return await dbManager.save(AccessEntity, newAccess); 
            }
            return await dbManager.update(AccessEntity, currentAccess, {access});
        }
    }
}

export default new VideoService();