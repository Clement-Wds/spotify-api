const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT || 3000;

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Middleware d'erreur global
app.use((err, req, res, next) => {
  res.status(500).send('Erreur : ' + err.message);
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    // Appel du middleware d'erreur global avec l'erreur
    return next(err);
  }
  // Si la connexion réussit, poursuivre le code
  //console.log('Connecté à la base de données MySQL');
});

app.get('/', (req, res) => {
  // Envoie un message au client
  res.send('Spotify is running');
});

app.listen(port, () => {
  // Envoie un message au client lorsque le serveur démarre
  //console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
