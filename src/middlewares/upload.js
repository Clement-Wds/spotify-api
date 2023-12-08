import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/musics');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({storage});

const albumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/albums');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const albumUpload = multer({storage: albumStorage});

export {upload, albumUpload};
