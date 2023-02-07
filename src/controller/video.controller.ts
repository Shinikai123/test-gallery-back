import {NextFunction, Request, Response} from 'express';
import { VideoService } from '../service/video.service';

export class VideoController {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        const {title} = req.body;
        const {id} = req.params;
        if(!title || !id) {
            res.sendStatus(401).json({error: `${title} - ${id}`})
        } else {
            try{
                const filename = req.file.filename;
            } catch (e) {
                console.log (e);
            }
        }
        
    }

    async getVideo(req : Request, res: Response, next: NextFunction) {
        try{

        } catch (e) {
            next(e);
    }
};
    async newVideo(req : Request, res: Response, next: NextFunction) {
        try{

        } catch (e) {
            next(e);
    }
    }

}