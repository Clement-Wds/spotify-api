import {Artist, Album, Music} from '../models/initModels.js';
import {Sequelize} from 'sequelize';

export const search = async (req, res) => {
  const query = req.query.q;
  try {
    const musics = await Music.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('title')),
        'LIKE',
        '%' + query.toLowerCase() + '%',
      ),
    });
    const albums = await Album.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('title')),
        'LIKE',
        '%' + query.toLowerCase() + '%',
      ),
    });
    const artists = await Artist.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')),
        'LIKE',
        '%' + query.toLowerCase() + '%',
      ),
    });

    res.json({musics, albums, artists});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'});
  }
};
