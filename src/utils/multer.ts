import multer from 'multer';

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${req.params.id}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },

  });



export const upload =  multer({storage});
