const db = require("../db/config/mongodbConnection");
const Profile = require("../models/profile");
const User = require("../models/users");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const register = await User.register(req.body);
      res.status(201).json({ message: "User has been created!" });
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

  static async getProfile(req, res, next) {
    try {
      const result = await Profile.getUserProfile(req.user.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async postProfile(req, res, next) {
    try {
      const userData = await db.collection("User").findOne({
        email: req.user.email,
      });

      const data = {
        ...req.body,
        userId: userData._id,
      };

      const result = await Profile.createProfile(data);

      if (result) {
        return res
          .status(201)
          .json({ message: "Profile has been created successfully!" });
      }
    } catch (error) {
      next(error);
    }
  }
};
