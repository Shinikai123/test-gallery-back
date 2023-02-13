import {NextFunction, Request, Response} from 'express';
import { VideoService } from '../service/video.service';

const videoService = new VideoService();

export class VideoController {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        const {title} = req.body;
        const {id} = req.params;
        if(!title || !id) {
            res.sendStatus(401).json({error: `${title} - ${id}`})
        } else {
            try{
                const filename = req?.file?.filename;
                const url = `${process.cwd()}/${process.env.STORAGE_PATH}/${id}/`;
                const uploadedVideo = await videoService.uploadVideo(id, title, url, filename)
                res.json(uploadedVideo);
            } catch (e) {
                next(e);
                console.log (e);
                res.sendStatus(401)
            }
        }
        
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

    async getAccess(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const {video_id} = req.query;
        try{
            const access = await videoService.getAccess(id, video_id);
            console.log(access);
            res.json(access);
        } catch(e){
            next(e)
            res.sendStatus(401)
        }
    } 
}

export default new VideoController();