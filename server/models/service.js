const db = require("../db/config/mongodbConnection");

module.exports = class Service {
    static async getService() {
        const result = db.collection("Service").find().toArray()
        return result;
    }
}

