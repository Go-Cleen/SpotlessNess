require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.MONGO_URI;
const uri =
  "mongodb+srv://yakashikii:yakashikii@final-project.yq7g6pp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("FinalProject");

module.exports = db
