import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
let mongo: any;
beforeAll(async () => {
     mongo = await MongoMemoryServer.create();
     const mongoUri = mongo.getUri();
     await mongoose.connect(mongoUri, {});
});
// beforeAll ru beforeAll of out tests

beforeEach(async () => {
     const collections = await mongoose.connection.db.collections(); //get all collections from all connections
     for (let collection of collections) {
          await collection.deleteMany({});
     }
});
// beforeEach runs before each of out test

afterAll(async () => {
     if (mongo) {
          await mongo.stop();
     }
     await mongoose.connection.close();
});
