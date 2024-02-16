const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { error: "No Authentication", status: 403 };
    }

    const accessToken = req.headers.access_token;

    const token = accessToken.split(" ")[1];

    const verifyToken = jwt.verify(token, process.env.HASH_SECRET);

    req.user = verifyToken;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
