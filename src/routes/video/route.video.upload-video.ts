import {NextFunction, Request, Response, Router} from "express";
import {UserController} from "../../controller/user.controller";
import { upload } from "../../utils/multer";

const router = Router()
const userController = new UserController()

router.post('/upload/:id', upload.single('file'), async (req:Request, res: Response, next: NextFunction) => {
  const {title} = req.body;
  const {id} = req.params;
  if (!title || !id) {
    res.sendStatus(401).json({error: `${title} - ${id}`})
  } else {
    // @ts-ignore
    console.log(req.file);
    res.json({message: "success"});
  }

});

export {router as uploadVideo};


