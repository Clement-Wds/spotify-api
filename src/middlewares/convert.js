import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';

export const convertAudio = (req, res, next) => {
  if (req.file && req.file.mimetype.startsWith('audio/')) {
    const output = `${req.file.path}.m4a`;
    ffmpeg(req.file.path)
      .output(output)
      .on('end', () => {
        req.file.path = output;
        next();
      })
      .run();
  } else {
    next();
  }
};

export const convertImage = (req, res, next) => {
  if (req.file && req.file.mimetype.startsWith('image/')) {
    const output = `${req.file.path}.webp`;
    sharp(req.file.path)
      .toFormat('webp')
      .toFile(output)
      .then(() => {
        req.file.path = output;
        next();
      });
  } else {
    next();
  }
};
