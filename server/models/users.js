const db = require("../db/config/mongodbConnection");

class User {
  static async register(form) {
    try {
      console.log(JSON.parse(JSON.stringify(form)), "<<< ini data");

      let formRegister = {
        ...form,
        role: "user",
      };

      const response = await db.collection("User").insertOne(formRegister);

      console.log(response, "<<< ini response");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
