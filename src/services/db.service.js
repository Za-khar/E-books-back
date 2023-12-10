const MongoClient = require("mongodb").MongoClient;
const config = require("../utils/config");

let db;

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(config.get("MONGODB_URI"));
    console.log("Connected to MongoDB");
    db = client.db("mybookdb");
  } catch (err) {
    console.error("MongoDB Connection Error: ", err);
  }
};

module.exports = {
  connectToMongoDB,
  getDB: () => db,
};
