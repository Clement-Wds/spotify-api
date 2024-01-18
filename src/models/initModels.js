import Artist from '../models/artist.js';
import Album from '../models/album.js';
import Music from '../models/music.js';
import Playlist from '../models/playlist.js';

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

Music.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
  as: 'playlist',
});

Playlist.hasMany(Music, {
  foreignKey: 'playlist_id',
  as: 'music',
});

export {Artist, Album, Music, Playlist};
