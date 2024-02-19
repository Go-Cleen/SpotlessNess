const db = require("../db/config/mongodbConnection");
const { ObjectId } = require("mongodb");

module.exports = class Service {
  static async getService() {
    const result = db.collection("Service").find().toArray();
    return result;
  }

  static async getServiceById(id) {

    const result = await db.collection("Service").findOne({
      _id: new ObjectId(String(id)),
    });

    if (result) {
      return result;
    }
  }
};
