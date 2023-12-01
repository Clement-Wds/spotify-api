import Album from '../models/album.js';
import Artist from '../models/artist.js';
import Music from '../models/Music.js';

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

export const createAlbum = async (req, res) => {
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

export const getAlbum = async (req, res) => {
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

export const updateAlbum = async (req, res) => {
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
