import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

ffmpeg.setFfmpegPath(ffmpegPath);

export const convertAudio = (req, res, next) => {
  if (req.files.file) {
    const output = `${req.files.file[0].path}.ogg`;
    ffmpeg(req.files.file[0].path)
      .output(output)
      .on('end', () => {
        req.files.file[0].path = output;
        next();
      })
      .run();
  } else {
    next();
  }
};

export const convertImage = (req, res, next) => {
  if (req.files.coverImage) {
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
