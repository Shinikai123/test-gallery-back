import multer from 'multer';

const storage =  multer.diskStorage({
    destination: './src/videoStorage',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },

  });

export const multerUploadVideo =  multer({storage});
