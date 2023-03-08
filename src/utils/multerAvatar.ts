import multer from "multer";
import fsExtra from "fs-extra";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     
      if(!fs.existsSync
        (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`)) 
      {
        fs.mkdirSync
        (`${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`); 
      } else {
        fsExtra.emptyDirSync(
          `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`); 
      }
      cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.userId}/${process.env.AVATAR_PATH}`); 
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  })

  const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" ||
       file.mimetype === "image/jpg" ||
       file.mimetype === "image/jpeg" ) {
        cb(null, true)
       } else {
        cb(new Error("incorrect file type"), false);
       }
  }
  
  export const multerUploadAvatar = multer({storage, fileFilter});