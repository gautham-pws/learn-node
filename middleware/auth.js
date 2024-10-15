const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = await jwt.verify(token, "secretKey");
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) {
      return "user not found";
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = auth;
