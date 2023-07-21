import { createArtistValidationSchema } from './validation/artist-validation.js';
import { createPopularSongValidationSchema } from './validation/popular-song-validation.js';
import { createSongValidationSchema } from './validation/song-validation.js';
import { MongoClient } from 'mongodb';
import { artists } from './data/artists.js';
import { popularSongs } from './data/popular-songs.js';
import { songs } from './data/songs.js';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export const connectToMongo = async ()=> {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}



const insertData = async ()=> {
    try {
      const db = client.db('gigih');
      let collection = db.collection('artists');
      //artist
      const insertedArtist = await collection.insertMany(artists);
      console.log(`${insertedArtist.insertedCount} artist documents inserted into the collection.`);
      
      //popular songs
      collection = db.collection('popularSongs');
      const insertedPopularSong = await collection.insertMany(popularSongs);
      console.log(`${insertedPopularSong.insertedCount} popular song documents inserted into the collection.`);

      //song
      collection = db.collection('songs');
      const insertedSong = await collection.insertMany(songs);
      console.log(`${insertedSong.insertedCount} song documents inserted into the collection.`);


    } catch (error) {
      console.error('Error inserting data', error);
    }
  }
  

const main = async ()=> {
    await connectToMongo();
    await createArtistValidationSchema();
    await createPopularSongValidationSchema();
    await createSongValidationSchema();
    await insertData();

}

main();


