import {Request, Response, Router} from "express";
import {dbManager} from "../../index";
import {VideoEntity} from "../../entity/index";

const router = Router()

router.get('/users/:id/videos', async (req: Request, res: Response) => {
  const {id} = req.params;
  const videoStorage = dbManager.getRepository(VideoEntity);
  const videos = await videoStorage.find({
    where: {owner: {id}},
    order: {id: 'DESC'}
  });
  return res.sendStatus(200).json(videos);
});

export {router as getVideo};