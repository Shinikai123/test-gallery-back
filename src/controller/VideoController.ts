import {NextFunction, Request, Response} from 'express';

export class VideoController {
    async upload(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = req.params;
        } catch (e) {
            console.log (e);
        }
    }
}