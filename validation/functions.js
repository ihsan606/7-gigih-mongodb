import { connectToMongo } from "../app.js";
import { MongoClient } from 'mongodb';


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
export const checkCollectionExists = async (collectionName)=> {
    try {
      connectToMongo();
      const db = client.db('gigih');
      const collections = await db.listCollections().toArray();
  
      for (const collection of collections) {
        if (collection.name === collectionName) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking collection', error);
      return false;
    }
  }