import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath);

export const convertAudio = (req, res, next) => {
  if (req.file) {
    const output = `${req.file.path}.ogg`;
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
