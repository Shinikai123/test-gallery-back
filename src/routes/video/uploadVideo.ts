import {NextFunction, Request, Response, Router} from "express";
import {UserController} from "../../controller/UserController";
import multer from 'multer';

const router = Router()
const userController = new UserController()

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({videoStorage});

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

    //const url = `/users/${id}/`
    // video.url = req.file.path;
    // const savedVideo = await dbManager.save(Video, {title, url,});

    // res.json(savedVideo);
});

export {router as uploadVideo};


