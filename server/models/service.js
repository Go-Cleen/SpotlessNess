const db = require("../db/config/mongodbConnection");
const { ObjectId } = require("mongodb");

module.exports = class Service {
  static async getService() {
    const result = db.collection("Service").find().toArray();
    return result;
  }

  static async getServiceById(id) {
    console.log(id, "<<< ini id dari model");

    const result = await db.collection("Service").findOne({
      _id: new ObjectId(id),
    });

    if (result) {
      return result;
    }
  }
};
