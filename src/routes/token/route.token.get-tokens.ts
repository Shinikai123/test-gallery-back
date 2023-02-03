import {Request, Response, Router} from "express";
import {dbManager} from "../../index";
import {TokenEntity} from "../../entity/index";

const router = Router()

router.get('/tokens', async (req: Request, res: Response) => {
  const users = await dbManager.find(TokenEntity)
  return res.status(200).json(users);
});


export {router as getTokens};