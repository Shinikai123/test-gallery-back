import multer from "multer";
import {extname} from "path"; 
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
      
      const name = 'avatar';
      const ext = extname(file.originalname);
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error("Only images with .jpg, .jpeg and .png are allowed"), "");
      } else {
        cb(null, `${name}${ext}`);
      }
      },
      

  });
  
  export const multerUploadAvatar = multer({storage});