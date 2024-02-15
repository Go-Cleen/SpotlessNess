const User = require("../models/users");

module.exports = class UserController {
  static async register(req, res, next) {
    const testing = await User.register(req.body);

    console.log(testing, "<<< ini panggilan controller");
  }
};
