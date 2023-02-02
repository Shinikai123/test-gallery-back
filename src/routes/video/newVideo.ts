import { dbManager } from "../../../index";
import { Video } from "../../entity/Video.entity";
import { Request, Response, Router } from "express";

const router = Router()

router.post('/videos', async (req: Request, res: Response) => {
    const {title, url, isPrivate, ovner} = req.body;
    const video = await dbManager.save(Video, {title, url, isPrivate, ovner})

    return res.json(video)
})

export {router as newVideo};