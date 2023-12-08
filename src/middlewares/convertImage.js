import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';

export const convertImage = async (req, res, next) => {
  if (req.files && req.files.coverImage) {
    const inputPath = req.files.coverImage[0].path;
    const outputPath = path.join(
      path.dirname(inputPath),
      `${path.basename(inputPath, path.extname(inputPath))}.webp`,
    );

    try {
      await imagemin([inputPath], {
        destination: path.dirname(outputPath),
        plugins: [imageminWebp({quality: 50})],
      });

      req.files.coverImage[0].path = outputPath;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({message: err.message});
    }
  } else {
    next();
  }
};
