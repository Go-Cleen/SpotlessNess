require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TESTING
    : process.env.MONGO_URL;
    
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = process.env.NODE_ENV === "test" ? client.db("FinalProject") : client.db("FinalProjectTest");

module.exports = db
