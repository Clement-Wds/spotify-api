import {upload} from '../middleware/upload';
import {convertAudio, convertImage} from '../middleware/convert';
const Music = require('../models/music');
const Artist = require('../models/artist');
const Album = require('../models/album');

export const createMusic = [
  upload.single('file'),
  convertAudio,
  convertImage,
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
        filePath: req.file.path,
      });
      res.status(201).json(music);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },
];

exports.getMusic = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id, {
      include: Artist,
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
  convertImage,
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
      const music = await Music.update(
        {
          ...req.body,
          filePath: req.file ? req.file.path : undefined,
        },
        {
          where: {id: req.params.id},
        },
      );
      if (music[0] === 1) {
        res.status(200).json({message: 'Music updated successfully'});
      } else {
        res.status(404).json({message: 'Music not found'});
      }
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },
];

exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.destroy({
      where: {id: req.params.id},
    });
    if (music === 1) {
      res.status(200).json({message: 'Music deleted successfully'});
    } else {
      res.status(404).json({message: 'Music not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
