import {Request, Response, Router} from "express";
import {dbManager} from "../../index";
import {VideoEntity} from "../../entity/index";

const router = Router()

router.get('/users/:id/videos', async (req: Request, res: Response) => {
  const { id } = req.params;
  const videoRepository = dbManager.getRepository(VideoEntity);
  const videos = await videoRepository.find({
    where: {  owner: { id }  },
  });
  return res.sendStatus(200).json(videos);
});

export {router as getVideo};