import {Artist, Album, Music} from '../models/initModels.js';
import {albumUpload} from '../middlewares/upload.js';
import {convertImage} from '../middlewares/convertImage.js';

//GET ALL Albums
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    if (albums) {
      res.status(200).json(albums);
    } else {
      res.status(404).json({message: 'No albums found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const createAlbum = [
  albumUpload.single('coverImagePath'),
  convertImage,
  async (req, res) => {
    try {
      const artist = await Artist.findByPk(req.body.artist_id);
      if (!artist) {
        return res.status(404).json({message: 'Artist not found'});
      }
      const album = await Album.create({
        ...req.body,
        coverImagePath: req.file ? req.file.path : null,
      });
      res.status(201).json(album);
    } catch (err) {
      console.log(req.file);
      console.log(err);
      res.status(400).json({message: err.message});
    }
  },
];

export const getAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [{model: Artist, as: 'artist'}],
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

export const updateAlbum = [
  albumUpload.single('coverImagePath'),
  convertImage,
  async (req, res) => {
    try {
      const {artist_id} = req.body;
      const {id} = req.params;

      const artist = await Artist.findByPk(artist_id);
      if (!artist) {
        return res.status(404).json({message: 'Artist not found'});
      }

      const updateData = {...req.body};
      if (req.file) {
        updateData.coverImagePath = req.file.path;
      }

      const [updateCount] = await Album.update(updateData, {where: {id}});
      if (updateCount === 0) {
        return res.status(404).json({message: 'Album not found'});
      }

      return res.status(200).json({message: 'Album updated successfully'});
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: err.message});
    }
  },
];

export const deleteAlbum = async (req, res) => {
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

export const getAlbumsByArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const albums = await Album.findAll({where: {artist_id: artistId}});
    if (!albums) {
      return res
        .status(404)
        .send({error: 'Aucun album trouvé pour cet artiste.'});
    }
    res.status(200).send(albums);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};

export const getAlbumByMusic = async (req, res) => {
  try {
    const musicId = req.params.musicId;
    const music = await Music.findByPk(musicId);
    if (!music) {
      return res.status(404).send({error: 'Musique non trouvée.'});
    }
    const album = await Artist.findByPk(music.album_id);
    if (!album) {
      return res.status(404).send({error: 'Album non trouvé.'});
    }
    res.status(200).send(album);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};
