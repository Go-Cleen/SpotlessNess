const db = require("../db/config/mongodbConnection");
const bcrypt = require("bcrypt");
const validateEmail = require("../helper/emailValidator");
const jwt = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../helper/bcryptFunctions");

class User {
  static async register(form) {
    if (form.password.length < 8) {
      throw {
        error: "Password must be at least 8 characters long",
        status: 401,
      };
    }

    const validateEmailFormat = validateEmail(form.email);

    if (!validateEmailFormat)
      throw { error: "Invalid email format", status: 400 };

    const checkEmail = await db
      .collection("User")
      .find({
        email: form.email,
      })
      .toArray();

    if (checkEmail.length > 0) {
      throw { error: "Email already registered", status: 401 };
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
      throw { error: "Invalid email format!", status: 401 };
    }

    const userData = await db
      .collection("User")
      .find({
        email: form.email,
      })
      .toArray();

    if (userData.length === 0) {
      throw { error: "Email/Password is incorrect.", status: 401 };
    }

    const validatePassword = comparePassword(
      form.password,
      userData[0].password
    );

    if (!validatePassword) {
      throw { error: "Email/Password is incorrect.", status: 401 };
    }

    const token = jwt.sign(
      {
        id: userData[0]._id,
        email: userData[0].email,
        username: userData[0].username,
        role: userData[0].role,
      },
      process.env.HASH_SECRET
    );

    return token;
  }

  static async changePassword(userData, oldPassword, newPassword) {
    const validateUser = await db
      .collection("User")
      .findOne({ email: userData.email });

    if (!validateUser) throw { error: "User not found!", status: 401 };

    const verifyOldPassword = comparePassword(
      oldPassword,
      validateUser.password
    );

    if (!verifyOldPassword)
      throw { error: "Old password is incorrect!", status: 401 };

    const verifyNewPassword = comparePassword(
      newPassword,
      validateUser.password
    );

    if (verifyNewPassword)
      throw {
        error: "New password cannot be the same as old password!",
        status: 401,
      };

    const updatePassword = await db.collection("User").updateOne(
      {
        email: userData.email,
      },
      {
        $set: {
          password: String(hashPassword(newPassword)),
        },
      }
    );

    if (updatePassword.modifiedCount === 0)
      throw { error: "Failed to change password", status: 400 };

    return updatePassword;
  }

  static async getEmployee() {
    const result = await db
      .collection("User")
      .find({
        role: "employee",
      })
      .toArray();

    return result;
  }
}

module.exports = User;
