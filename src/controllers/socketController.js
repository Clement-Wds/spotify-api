// socketController.js
const socketController = io => {
  const users = new Map();

  io.on('connection', socket => {
    socket.on('register', username => {
      users.set(socket.id, username);
      console.log(`${username} s'est connecté`);
    });

    socket.on('disconnect', () => {
      const username = users.get(socket.id) || 'Anonyme';
      console.log(`${username} s'est déconnecté`);
      users.delete(socket.id);
    });

    socket.on('shareTime', musique => {
      io.emit('shareTime', musique);
    });
  });
};

export default socketController;
