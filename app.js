const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const sequelize = require('./src/sequelize');

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT;

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// // Middleware d'erreur global
app.use((err, req, res, next) => {
  res.status(500).send('Erreur : ' + err.message);
});

// // Connexion à la base de données
db.connect(err => {
  if (err) {
    // Appel du middleware d'erreur global avec l'erreur
    return next(err);
  }
  // Si la connexion réussit, poursuivre le code
  //console.log('Connecté à la base de données MySQL');
});

app.use('/api', routes); // Toutes les routes seront préfixées par /api

// Synchronisez les modèles avec la base de données
sequelize.sync().then(() => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

app.listen(port, () => {
  // Envoie un message au client lorsque le serveur démarre
  //console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
