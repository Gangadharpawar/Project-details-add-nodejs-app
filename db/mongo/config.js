import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION);

export const connectDB = async () => {
  //mongodb connection
  await client.connect();
  return client;
};
export function getDB() {
  //return database
  return client.db("Projectdb");
}
