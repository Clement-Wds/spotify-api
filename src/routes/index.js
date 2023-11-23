const express = require('express');
const authController = require('../controllers/authController');
const musicController = require('../controllers/musicController');
const artistController = require('../controllers/artistController');
const {authenticateToken} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', authenticateToken, (req, res) =>
  res.send('Cette route est protégée, ça fonctionne'),
);

// Routes for music
router.post('/music', authenticateToken, musicController.createMusic);
router.get('/music/:id', authenticateToken, musicController.getMusic);
router.put('/music/:id', authenticateToken, musicController.updateMusic);
router.delete('/music/:id', authenticateToken, musicController.deleteMusic);

// Routes for artist
router.post('/artist', authenticateToken, artistController.createArtist);
router.get('/artist/:id', authenticateToken, artistController.getArtist);
router.put('/artist/:id', authenticateToken, artistController.updateArtist);
router.delete('/artist/:id', authenticateToken, artistController.deleteArtist);

module.exports = router;
