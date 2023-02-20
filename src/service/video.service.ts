import { dbManager } from "../index";
import {VideoEntity} from "../entity/index";
import { AccessEntity } from "../entity/index";

import * as fs from "fs"

export class VideoService {
    async uploadVideo(id, title, url, filename){
        const newVideo = await dbManager.create(VideoEntity, {title, url, filename, owner: id});
        const savedVideo = await dbManager.save(VideoEntity, newVideo);

        const getAccess = await dbManager.create(AccessEntity, {user_id: id, video_id: savedVideo.id, access: "granted" });
        await dbManager.save(AccessEntity, getAccess);

        return savedVideo
    }

    async deleteVideo(id) {
        return dbManager.delete(VideoEntity, {id})
    }

    async getAccess(user_id : string, video_id: any) {
        try{
            const access = await dbManager.findOne(AccessEntity, {where: {user_id : user_id, video_id : video_id}})
            if(!access) {
                const getAccess = await dbManager.create(AccessEntity, {user_id: user_id, video_id: video_id, access: "denied"});
                await dbManager.save(AccessEntity, getAccess);
            }
            return dbManager.findOne(AccessEntity, {where: {user_id : user_id, video_id : video_id}});
        } catch(e) {
            return(e)
        }
    }

    
  async createStream(video_id, user_id) {
    const video = await dbManager.findOne(VideoEntity, { where: { id: video_id } });
    return fs.createReadStream(
      `${process.cwd()}/${process.env.STORAGE_PATH}/${video.filename}`
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

    async updateAccess(user_id, video_id, access) {
        if(access) {
            const currentAccess = await dbManager.findOne( AccessEntity, {
                where: {user_id : user_id, video_id: video_id},
            });
            if(access === currentAccess) {
                return await dbManager.delete(AccessEntity, currentAccess)
            }
            if(!currentAccess) {
                const newAccess = await dbManager.create(AccessEntity, {
                    user_id: user_id,
                    video_id: video_id,
                    access: "granted",
                });
                return await dbManager.save(AccessEntity, newAccess); 
            }
            return await dbManager.update(AccessEntity, currentAccess, {access});
        }
    }
}

export default new VideoService();