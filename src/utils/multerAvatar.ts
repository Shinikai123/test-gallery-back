import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.cwd()}/${process.env.AVATAR_PATH}`)
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