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
        res.status(200).json({access_token: login})
    } catch (error) {
        next(error)
    }
  }
};
