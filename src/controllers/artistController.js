import {Artist, Album, Music} from '../models/initModels.js';
import fs from 'fs';

//GET ALL Artists
export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    if (artists) {
      res.status(200).json(artists);
    } else {
      res.status(404).json({message: 'No artists found'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    res
      .status(artist ? 200 : 404)
      .json(artist || {message: 'Artist not found'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateArtist = async (req, res) => {
  try {
    const [updated] = await Artist.update(req.body, {
      where: {id: req.params.id},
    });
    res.status(updated ? 200 : 404).json({
      message: updated ? 'Artist updated successfully' : 'Artist not found',
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

// Function to delete a music
const deleteMusicFile = async music => {
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
  await Music.destroy({
    where: {id: music.id},
  });
};

// Function to delete an album
const deleteAlbumFile = async album => {
  // Delete the file
  if (fs.existsSync(album.coverImagePath)) {
    fs.unlink(album.coverImagePath, err => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    console.log('File does not exist');
  }

  // Delete the database entry
  await Album.destroy({
    where: {id: album.id},
  });
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({message: 'Artist not found'});
    }

    // Delete all musics of the artist
    const musics = await Music.findAll({where: {artist_id: artist.id}});
    for (let music of musics) {
      await deleteMusicFile(music);
    }

    // Delete all albums of the artist
    const albums = await Album.findAll({where: {artist_id: artist.id}});
    for (let album of albums) {
      await deleteAlbumFile(album);
    }

    // Delete the database entry
    const deleted = await Artist.destroy({
      where: {id: req.params.id},
    });
    res.status(deleted ? 200 : 404).json({
      message: deleted ? 'Artist deleted successfully' : 'Artist not found',
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const getArtistByMusic = async (req, res) => {
  try {
    const musicId = req.params.musicId;
    const music = await Music.findByPk(musicId);
    if (!music) {
      return res.status(404).send({error: 'Musique non trouvée.'});
    }
    const artist = await Artist.findByPk(music.artist_id);
    if (!artist) {
      return res.status(404).send({error: 'Artiste non trouvé.'});
    }
    res.status(200).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};

export const getArtistByAlbum = async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).send({error: 'Album non trouvé.'});
    }
    const artist = await Artist.findByPk(album.artist_id);
    if (!artist) {
      return res.status(404).send({error: 'Artiste non trouvé.'});
    }
    res.status(200).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Erreur du serveur.'});
  }
};
