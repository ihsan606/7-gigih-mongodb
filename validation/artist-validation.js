import { checkCollectionExists } from "./functions.js";
import { connectToMongo } from "../app.js";
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
export const createArtistValidationSchema = async ()=> {
    try {
        connectToMongo();
        const db = client.db('gigih');
  
        const isCollectionExist = await checkCollectionExists('artists');
  
        if(isCollectionExist) {
          console.log('collection already exists');
        } else {
          await db.createCollection('artists', {
              validator: {
                $jsonSchema: {
                  bsonType: 'object',
                  required: ['name', 'date_of_birth', 'genres'],
                  properties: {
                    name: {
                      bsonType: 'string',
                    },
                    date_of_birth: {
                      bsonType: 'string',
                    },
                    genres: {
                      bsonType: 'array',
                      items: {
                        bsonType: 'string',
                      },
                    },
                  },
                },
              },
            });
        }
  
        console.log('Artists Collection created');
      } catch (error) {
        console.error('Error creating collection', error);
      }
}
