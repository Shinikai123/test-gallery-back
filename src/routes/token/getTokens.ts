import {Request, Response, Router} from "express";
import {dbManager} from "../../../index";
import {Token} from "../../entity/Token.entity";

const router = Router()

router.get('/tokens', async (req: Request, res: Response) => {
  const users = await dbManager.find(Token)
  return res.status(200).json(users);
});


export {router as getTokens};