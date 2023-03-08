import multer from 'multer';
import fs from "fs";

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
      if(!fs.existsSync
        (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`))
        {
        fs.mkdirSync
        (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`);
        }
      cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}/${process.env.VIDEO_PATH}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },

  });

export const multerUploadVideo =  multer({storage});
