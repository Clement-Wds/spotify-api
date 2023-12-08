import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';

export const convertImage = (req, res, next) => {
  if (req.files && req.files.coverImage) {
    const output = `${req.files.coverImage[0].path}.webp`;
    sharp(req.files.coverImage[0].path)
      .toFormat('webp')
      .toFile(output)
      .then(() => {
        req.files.coverImage[0].path = output;
        next();
      });
  } else {
    next();
  }
};
