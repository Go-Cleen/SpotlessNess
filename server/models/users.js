const db = require("../db/config/mongodbConnection");
const bcrypt = require("bcrypt");
class User {
  static async register(form) {
    try {
      console.log(JSON.parse(JSON.stringify(form)), "<<< ini data");

      let formRegister = {
        ...form,
        password: bcrypt.hashSync(form.password, bcrypt.genSaltSync(8)),
        role: "user",
      };

        const response = await db.collection("User").insertOne(formRegister);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
