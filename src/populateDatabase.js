import Artist from './models/artist.js';
import Music from './models/music.js';
import Album from './models/album.js';

async function populateDatabase() {
  const artist1 = await Artist.create({name: 'Artist 1'});
  const artist2 = await Artist.create({name: 'Artist 2'});

  const album1 = await Album.create({title: 'Album 1', artist_id: artist1.id});
  const album2 = await Album.create({title: 'Album 2', artist_id: artist2.id});

  await Music.create({
    title: 'Music 1',
    artist_id: artist1.id,
    album_id: album1.id,
    year: 2023,
    genre: 'Genre 1',
    trackNumber: 1,
    filePath: '/path/to/music1.mp3',
    duration: 180,
  });
  await Music.create({
    title: 'Music 2',
    artist_id: artist2.id,
    album_id: album2.id,
    year: 2023,
    genre: 'Genre 2',
    trackNumber: 2,
    filePath: '/path/to/music2.mp3',
    duration: 200,
  });
}

populateDatabase().catch(console.error);
