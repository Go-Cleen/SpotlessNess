const User = require("../models/users");

module.exports = class UserController {
  static async register(req, res, next) {
    const register = await User.register(req.body);

    res.status(201).json({ message: "User has been created!" });
  }
};
