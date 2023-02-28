import multer from "multer";

const storage = multer.diskStorage({
    destination: './src/avatarStorage',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}/.{jpeg, jpg, png}`);
    },
  })
  
  export const multerUploadAvatar = multer({storage});