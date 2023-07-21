import { checkCollectionExists } from "./functions.js";
import { connectToMongo } from "../app.js";
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
export const createSongValidationSchema = async ()=> {
    try {
        connectToMongo();
        const db = client.db('gigih');
  
        const isCollectionExist = await checkCollectionExists('songs');
  
        if(isCollectionExist) {
          console.log('collection already exists');
        } else {
          await db.createCollection('songs', {
              validator: {
                $jsonSchema: {
                  bsonType: 'object',
                  required: ['title', 'artists', 'album'],
                  properties: {
                    title: {
                      bsonType: 'string',
                    },
                    artists: {
                      bsonType: 'array',
                      items: {
                        bsonType: 'string',
                      }
                    },
                    album: {
                      bsonType: 'string',
                    },
                  },
                },
              },
            });
        }
  
        console.log('songs Collection created');
      } catch (error) {
        console.error('Error creating collection', error);
      }
}
