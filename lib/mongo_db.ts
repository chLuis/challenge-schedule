// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//
/*
MONGO_URI = mongodb+srv://chrestialuis:ceNdbkQJM6OS5tcg@cluster0.rx0sb3t.mongodb.net/


*/
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not
  // constantly re-created during hot reloading.
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri!);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri!);
  clientPromise = client.connect();
}

export default clientPromise;
