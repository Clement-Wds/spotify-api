import redis from 'redis';
const redisClient = redis.createClient();

const cache = (req, res, next) => {
  const {id} = req.params;

  redisClient.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

export default cache;
