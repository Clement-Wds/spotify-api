import express from 'express';
import {register, login} from '../controllers/authController.js';
import {
  getAllMusic,
  streamMusicFile,
  createMusic,
  getMusic,
  updateMusic,
  deleteMusic,
  getMusicByArtist,
  getMusicsByAlbum,
} from '../controllers/musicController.js';
import {
  getAllArtists,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
  getArtistByMusic,
  getArtistByAlbum,
} from '../controllers/artistController.js';
import {
  getAllAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumsByArtist,
  getAlbumByMusic,
  getAlbumImage,
} from '../controllers/albumController.js';
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addMusicToPlaylist,
  removeMusicFromPlaylist,
} from '../controllers/playlistController.js';
import {search} from '../controllers/searchController.js';
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
router.get('/music/:id', getMusic);
router.put('/music/:id', authenticateToken, updateMusic);
router.delete('/music/:id', authenticateToken, deleteMusic);
router.get('/artist/:artistId/musics', getMusicByArtist);
router.get('/album/:albumId/musics', getMusicsByAlbum);

// Routes for artist
router.get('/artists', getAllArtists);
router.post('/artist', authenticateToken, createArtist);
router.get('/artist/:id', getArtist);
router.put('/artist/:id', authenticateToken, updateArtist);
router.delete('/artist/:id', authenticateToken, deleteArtist);
router.get('/music/:musicId/artist', getArtistByMusic);
router.get('/album/:albumId/artist', getArtistByAlbum);

// Routes for album
router.get('/albums', getAllAlbums);
router.get('/album/image/:id', getAlbumImage);
router.post('/album', authenticateToken, createAlbum);
router.get('/album/:id', getAlbum);
router.put('/album/:id', authenticateToken, updateAlbum);
router.delete('/album/:id', authenticateToken, deleteAlbum);
router.get('/artist/:artistId/albums', getAlbumsByArtist);
router.get('/music/:musicId/album', getAlbumByMusic);

// Routes for playlists
router.post('/playlist', createPlaylist);
router.get('/playlists', getAllPlaylists);
router.get('/playlist/:id', getPlaylist);
router.put('/playlist/:id', updatePlaylist);
router.delete('/playlist/:id', deletePlaylist);
router.post('/playlist/:id/music', addMusicToPlaylist);
router.delete('/playlist/:id/music', removeMusicFromPlaylist);

//SEARCH
router.get('/search', search);

export default router;
