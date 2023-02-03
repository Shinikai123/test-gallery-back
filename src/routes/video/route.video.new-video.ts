import { dbManager } from "../../index";
import { VideoEntity } from "../../entity/index";
import { Request, Response, Router } from "express";

const router = Router()

router.post('/videos', async (req: Request, res: Response) => {
    const {title, url, isPrivate, ovner} = req.body;
    const video = await dbManager.save(VideoEntity, {title, url, isPrivate, ovner})

    return res.json(video)
})

export {router as newVideo};