// middleware de nettoyage
const cleanup = (req, res, next) => {
  redisClient.quit();
  next();
};

// Utilisez ce middleware après toutes vos routes et middlewares
app.use(cleanup);
