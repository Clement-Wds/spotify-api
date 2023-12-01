import express from 'express';
import {register, login} from '../controllers/authController.js';
import {
  getMusicByArtist,
  getAllMusic,
  streamMusicFile,
  createMusic,
  getMusic,
  updateMusic,
  deleteMusic,
} from '../controllers/musicController.js';
import {
  getArtistByMusic,
  getAllArtists,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
} from '../controllers/artistController.js';
import {
  getAllAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albumController.js';
import {authenticateToken} from '../middlewares/auth.js';
import cache from '../middlewares/cache.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authenticateToken, (req, res) =>
  res.send('Cette route est protégée, ça fonctionne'),
);

// Routes for music
router.get('/musics', getAllMusic);
router.get('/music/file/:id', streamMusicFile);
router.post('/music', authenticateToken, createMusic);
router.get('/music/:id', cache, getMusic);
router.put('/music/:id', authenticateToken, updateMusic);
router.delete('/music/:id', authenticateToken, deleteMusic);
router.get('/artist/:artistId/musics', getMusicByArtist);

// Routes for artist
router.get('/artists', getAllArtists);
router.post('/artist', authenticateToken, createArtist);
router.get('/artist/:id', getArtist);
router.put('/artist/:id', authenticateToken, updateArtist);
router.delete('/artist/:id', authenticateToken, deleteArtist);
router.get('/music/:musicId/artist', getArtistByMusic);

// Routes for album
router.get('/albums', getAllAlbums);
router.post('/album', authenticateToken, createAlbum);
router.get('/album/:id', getAlbum);
router.put('/album/:id', authenticateToken, updateAlbum);
router.delete('/album/:id', authenticateToken, deleteAlbum);

export default router;
