const db = require("../db/config/mongodbConnection");
const bcrypt = require("bcrypt");
const validateEmail = require("../helper/emailValidator");
const jwt = require("jsonwebtoken");

class User {
  static async register(form) {
    if (form.password.length < 8) {
      throw {
        message: "Password must be at least 8 characters long",
        status: 401,
      };
    }

    const validateEmail = await db
      .collection("User")
      .find({
        email: form.email,
      })
      .toArray();

    if (validateEmail.length > 0) {
      throw { message: "Email already registered", status: 401 };
    }

    let formRegister = {
      ...form,
      password: bcrypt.hashSync(form.password, bcrypt.genSaltSync(8)),
      role: "user",
    };

    const response = await db.collection("User").insertOne(formRegister);

    return response;
  }

  static async login(form) {
    const validateEmailFormat = validateEmail(form.email);

    if (!validateEmailFormat) {
      throw { message: "Invalid email format!", status: 401 };
    }

    const userData = await db
      .collection("User")
      .find({
        email: form.email,
      })
      .toArray();

    if (userData.length === 0) {
      throw { message: "Email/Password is incorrect.", status: 401 };
    }

    const validatePassword = bcrypt.compareSync(
      form.password,
      userData[0].password
    );

    if (!validatePassword) {
      throw { message: "Email/Password is incorrect.", status: 401 };
    }

    const token = jwt.sign(
      {
        email: userData[0].email,
        username: userData[0].username,
        role: userData[0].role,
      },
      process.env.HASH_SECRET
    );

    return token;
  }
}

module.exports = User;
