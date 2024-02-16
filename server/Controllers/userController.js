const db = require("../db/config/mongodbConnection");
const Profile = require("../models/profile");
const User = require("../models/users");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const register = await User.register(req.body);
      res.status(201).json({ error: "User has been created!" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const login = await User.login(req.body);
      res.status(200).json({ access_token: login });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const userData = req.user;
      const newPassword = req.body.newPassword;
      const oldPassword = req.body.oldPassword;
      const result = await User.changePassword(
        userData,
        oldPassword,
        newPassword
      );

      if (result.modifiedCount > 0) {
        return res.status(200).json({ message: "Password has been updated!" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const userData = await db.collection("User").find().toArray();
      console.log(userData, "<<< ini userdata");

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
};
