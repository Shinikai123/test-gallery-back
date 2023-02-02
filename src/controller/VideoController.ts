import {NextFunction, Request, Response} from 'express';

export class VideoController {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = req.params;
        } catch (e) {
            console.log (e);
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