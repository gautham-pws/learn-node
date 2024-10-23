// authentication logic

import jwt from "jsonwebtoken";
import {User} from "../models";

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
      const error = {
        status: "error",
        status_code: 401,
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

export default auth;
