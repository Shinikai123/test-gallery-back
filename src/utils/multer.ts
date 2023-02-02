import multer from 'multer';

const storage = (id: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.cwd()}/${process.env.STORAGE_PATH}/${id}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },

  });

}


export const upload = (id: string) => multer(storage(id));
