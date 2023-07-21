import { checkCollectionExists } from "./functions.js";
import { connectToMongo } from "../app.js";
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
export const createPopularSongValidationSchema = async ()=> {
    try {
        connectToMongo();
        const db = client.db('gigih');
  
        const isCollectionExist = await checkCollectionExists('popularSongs');
  
        if(isCollectionExist) {
          console.log('collection already exists');
        } else {
          await db.createCollection('popularSongs', {
              validator: {
                $jsonSchema: {
                  bsonType: 'object',
                  required: ['title', 'play_count', 'period'],
                  properties: {
                    title: {
                      bsonType: 'string',
                    },
                    play_count: {
                      bsonType: 'int',
                    },
                    period: {
                      bsonType: 'object',
                      required: ['start_date', 'end_date'],
                      properties: {
                        start_date: {
                            bsonType: 'string',
                        },
                        end_date: {
                            bsonType: 'string',
                        }
                      },
                    },
                  },
                },
              },
            });
        }
  
        console.log('PopularSongs Collection created');
      } catch (error) {
        console.error('Error creating collection', error);
      }
}
