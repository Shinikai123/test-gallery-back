import multer from "multer";

const storage = multer.diskStorage({
    destination: './src/avatarStorage',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  })
  
  export const multerUploadAvatar = multer({storage});