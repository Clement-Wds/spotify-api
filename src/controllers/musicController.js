import {upload} from '../middlewares/upload.js';
import {convertAudio} from '../middlewares/convertAudio.js';
import {Artist, Album, Music} from '../models/initModels.js';
import fs from 'fs';
import path from 'path';

//GET ALL Musics
export const getAllMusic = async (req, res) => {
  try {
    const music = await Music.findAll();
    if (music) {
      res.status(200).json(music);
    } else {
      res.status(404).json({message: 'No music found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

//STREAM
export const streamMusicFile = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (music) {
      const absolutePath = path.resolve(music.filePath);
      res.sendFile(absolutePath);
      console.log(absolutePath);
    } else {
      res.status(404).json({message: 'Music not found'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export const createMusic = [
  upload.single('file'),
  convertAudio,
  async (req, res) => {
    try {
      const artist = await Artist.findByPk(req.body.artist_id);
      if (!artist) {
        return res.status(404).json({message: 'Artist not found'});
      }
      const album = await Album.findByPk(req.body.album_id);
      if (!album) {
        return res.status(404).json({message: 'Album not found'});
      }

      const music = await Music.create({
        ...req.body,
        filePath: req.file ? req.file.path : null,
      });
      res.status(201).json(music);
    } catch (err) {
      console.log(req.file);
      console.log(err);
      res.status(400).json({message: err.message});
    }
  },
];

export const getMusic = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id, {
      include: {model: Artist, as: 'artist'},
    });
    if (music) {
      res.status(200).json(music);
    } else {
      res.status(404).json({message: 'Music not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateMusic = [
  upload.single('file'),
  convertAudio,
  async (req, res) => {
    try {
      const artist = await Artist.findByPk(req.body.artist_id);
      if (!artist) {
        return res.status(404).json({message: 'Artist not found'});
      }
      const album = await Album.findByPk(req.body.album_id);
      if (!album) {
        return res.status(404).json({message: 'Album not found'});
      }
      const [updated] = await Music.update(
        {
          ...req.body,
          filePath: req.file ? req.file.path : undefined,
        },
        {
          where: {id: req.params.id},
        },
      );
      res.status(updated ? 200 : 404).json({
        message: updated ? 'Music updated successfully' : 'Music not found',
      });
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },
];

export const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({message: 'Music not found'});
    }

    // Delete the file
    if (fs.existsSync(music.filePath)) {
      fs.unlink(music.filePath, err => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.log('File does not exist');
    }

    // Delete the database entry
    const deleted = await Music.destroy({
      where: {id: req.params.id},
    });
    res.status(deleted ? 200 : 404).json({
      message: deleted ? 'Music deleted successfully' : 'Music not found',
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const getMusicByArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const musics = await Music.findAll({where: {artist_id: artistId}});
    if (!musics) {
      return res
        .status(404)
        .send({error: 'Aucune musique trouvée pour cet artiste.'});
    }
    res.status(200).send(musics);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};

export const getMusicsByAlbum = async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const musics = await Music.findAll({where: {album_id: albumId}});
    if (!musics) {
      return res
        .status(404)
        .send({error: 'Aucune musique trouvée pour cet album.'});
    }
    res.status(200).send(musics);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};
