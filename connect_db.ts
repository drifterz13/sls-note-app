import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@node-mongo-aws-eb.v4zgy.mongodb.net/node-mongo-aws-eb?retryWrites=true&w=majority`;

// Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    console.log("DB is cached.");
    return cachedDb;
  }
  // Connect to our MongoDB database hosted on MongoDB Atlas
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}
