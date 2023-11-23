// cache.js
const redis = require('redis');
const redisClient = redis.createClient();

function cache(req, res, next) {
  const {id} = req.params;

  redisClient.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

module.exports = cache;
