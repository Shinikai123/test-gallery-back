import {Request, Response, Router} from "express";
import {dbManager} from "../../../index";
import {Video} from "../../entity/Video.entity";

const router = Router()

router.get('/users/:id/videos', async (req: Request, res: Response) => {
  const { id } = req.params;
  const videoRepository = dbManager.getRepository(Video);
  const videos = await videoRepository.find({
    where: {  owner: { id }  },
  });
  return res.sendStatus(200).json(videos);
});

export {router as getVideo};