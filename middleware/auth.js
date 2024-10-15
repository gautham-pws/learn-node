// const jwt = require("jsonwebtoken");
// const User = require("../db/models/user");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");

//     const decode = await jwt.verify(token, "secretKey");
//     const user = await User.findOne({
//       _id: decode._id,
//       "tokens.token": token,
//     });
//     if (!user) {
//       return "user not found";
//     }
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({error: "Authentication token missing"});
    }

    const decode = jwt.verify(token, "secretKey");
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      //   return res.status(401).send({error: "Invalid or expired token"});
      const error = {
        status: "error",
        status_code: 400,
        timestamp: new Date(),
        path: "/api/users",
        request_id: req.requestId,
        error: {
          message: "Invalid or expired token",
        },
      };
      res.status(401).send(error);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({error: "Authentication failed"});
  }
};

module.exports = auth;
