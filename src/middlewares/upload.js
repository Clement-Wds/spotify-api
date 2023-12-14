import multer from 'multer';
import fs from 'fs';
import {Album} from '../models/initModels.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/musics');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({storage});

const removeOldFile = async (req, file, cb) => {
  if (req.params.id) {
    const album = await Album.findByPk(req.params.id);
    if (album && album.coverImagePath) {
      fs.unlink(album.coverImagePath, err => {
        if (err) {
          console.error(err);
        }
        cb(null, true);
      });
    } else {
      cb(null, true);
    }
  } else {
    cb(null, true);
  }
};

const albumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/albums');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.webp`);
  },
});

const albumUpload = multer({
  storage: albumStorage,
  fileFilter: removeOldFile,
});

export {upload, albumUpload};
