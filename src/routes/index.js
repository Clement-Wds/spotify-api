import express from 'express';
import {register, login} from '../controllers/authController.js';
import {
  createMusic,
  getMusic,
  updateMusic,
  deleteMusic,
} from '../controllers/musicController.js';
import {
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
} from '../controllers/artistController.js';
import {
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
router.post('/music', authenticateToken, createMusic);
router.get('/music/:id', authenticateToken, cache, getMusic);
router.put('/music/:id', authenticateToken, updateMusic);
router.delete('/music/:id', authenticateToken, deleteMusic);

// Routes for artist
router.post('/artist', authenticateToken, createArtist);
router.get('/artist/:id', authenticateToken, getArtist);
router.put('/artist/:id', authenticateToken, updateArtist);
router.delete('/artist/:id', authenticateToken, deleteArtist);

// Routes for album
router.post('/album', authenticateToken, createAlbum);
router.get('/album/:id', authenticateToken, getAlbum);
router.put('/album/:id', authenticateToken, updateAlbum);
router.delete('/album/:id', authenticateToken, deleteAlbum);

export default router;
