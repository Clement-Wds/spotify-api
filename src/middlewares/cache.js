import redis from 'redis';
import {promisify} from 'util';

const redisClient = redis.createClient();

redisClient.on('error', err => {
  console.error('Erreur avec le client Redis :', err);
});

redisClient.on('connect', () => {
  console.log('Connecté à Redis');
});

redisClient.on('end', () => {
  console.log('Déconnecté de Redis');
});

const getAsync = promisify(redisClient.get).bind(redisClient);

const cache = async (req, res, next) => {
  const {id} = req.params;

  try {
    const data = await getAsync(id);

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export default cache;
