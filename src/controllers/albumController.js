const Album = require('../models/album');
const Artist = require('../models/artist');

exports.createAlbum = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.body.artist_id);
    if (!artist) {
      return res.status(404).json({message: 'Artist not found'});
    }
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: Artist,
    });
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({message: 'Album not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.body.artist_id);
    if (!artist) {
      return res.status(404).json({message: 'Artist not found'});
    }
    const album = await Album.update(req.body, {
      where: {id: req.params.id},
    });
    if (album[0] === 1) {
      res.status(200).json({message: 'Album updated successfully'});
    } else {
      res.status(404).json({message: 'Album not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.destroy({
      where: {id: req.params.id},
    });
    if (album === 1) {
      res.status(200).json({message: 'Album deleted successfully'});
    } else {
      res.status(404).json({message: 'Album not found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
