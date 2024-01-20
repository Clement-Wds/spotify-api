import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import sequelize from './src/sequelize.js';
import cors from 'cors';
import redis from 'redis';
import {createServer} from 'https';
import {Server} from 'socket.io';
import socketController from './src/controllers/socketController.js';
import fs from 'fs'; // Ajout de l'importation du module fs

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT;

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error("La clé secrète JWT n'est pas définie dans le fichier .env");
  process.exit(1); // Arrêtez le processus Node.js en cas d'erreur critique
}

app.use(cors());

const redisClient = redis.createClient();

// Middleware Body Parser
app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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
    console.log(err);
    //return next(err);
  }
  // Si la connexion réussit, poursuivre le code
  //console.log('Connecté à la base de données MySQL');
});

app.use('/api', routes); // Toutes les routes seront préfixées par /api

// Synchronisez les modèles avec la base de données
// sequelize
//   .sync({
//     //alter: true,
//   })
//   .then(() => {
//     console.log(`Serveur en cours d'exécution sur le port ${port}`);
//   });

//SOCKETS
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

const httpsServer = https.createServer(options, app);

const io = new Server(httpsServer, {
  cors: {
    origin: 'https://spotify-frontend-one.vercel.app',
  },
});

socketController(io);

httpsServer.listen(port, () => {
  //console.log(`Serveur en cours d'exécution sur : ${port}`);
});

// app.listen(port, () => {
//   // Envoie un message au client lorsque le serveur démarre
//   //console.log(`Serveur en cours d'exécution sur le port ${port}`);
// });
