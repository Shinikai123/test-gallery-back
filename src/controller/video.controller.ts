import {NextFunction, Request, Response} from 'express';
import { dbManager } from '..';
import { VideoEntity } from '../entity';
import { VideoService } from '../service/video.service';

const videoService = new VideoService();

export class VideoController {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        console.log(12213123321);
        
        const {title} = req.body;
        const {id} = req.params;
        console.log(title);
        
        if(!title || !id) {
            res.status(401).json({error: `${title} - ${id}`})
        } else {
            try{
                const filename = req.file?.filename;
                const url = `${process.cwd()}/${process.env.STORAGE_PATH}/${id}/${process.env.VIDEO_PATH}/`;
                const uploadedVideo = await videoService.uploadVideo(id, title, url, filename)
                res.json(uploadedVideo);
            } catch (e) {
                next(e);
                console.log (e);
                res.sendStatus(401)
            }
        }
        
    }

    async getVideos(req: Request, res: Response) {
        const {id} = req.params;
        const videoStorage = dbManager.getRepository(VideoEntity);
        const videos = await videoStorage.find({
          where: {owner: {id}},
          order: {id: 'DESC'}
        });
        return res.json(videos);
      }

    async deleteVideo(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        try{
            const deletedVideo = await videoService.deleteVideo(id);
            res.json(deletedVideo);
        } catch(e) {
            next(e)
            res.sendStatus(401)
        }
    }

    
  async stream(req: Request, res: Response) {
    const {video_id, user_id} = req.params;
    const readStream = await videoService.createStream(video_id, user_id);

    readStream.pipe(res);
  }

    async getAccess(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const {video_id} = req.query;
        try{
            const access = await videoService.getAccess(id, video_id);
            console.log(access);
            res.json(access);
        } catch(e){
            next(e)
            res.status(401)
        }
    }
    
    async updateVideo(req: Request, res: Response) {
        const {id} = req.params;
        const { title} = req.body;
        await videoService.updateVideo(id, title);

        return res.sendStatus(200);
    }

    async setAccess(req: Request, res: Response) {
        const {id} = req.params;
        const {video_id, access} = req.body;
        console.log(id);
        await videoService.updateAccess(id, video_id, access);

        return res.sendStatus(200);
    }
}

export default new VideoController();