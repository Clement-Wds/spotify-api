import Artist from '../models/artist.js';
import Album from '../models/album.js';
import Music from '../models/music.js';

Artist.hasMany(Album, {
  foreignKey: 'artist_id',
  as: 'albums',
});

Artist.hasMany(Music, {
  foreignKey: 'artist_id',
  as: 'music',
});

Album.belongsTo(Artist, {
  foreignKey: 'artist_id',
  as: 'artist',
});

Music.belongsTo(Artist, {
  foreignKey: 'artist_id',
  as: 'artist',
});

Music.belongsTo(Album, {
  foreignKey: 'album_id',
  as: 'album',
});

export {Artist, Album, Music};
