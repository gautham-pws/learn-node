// authentication logic

import jwt from "jsonwebtoken";
import {User} from "../models/index.js";
import resFormat from "../utilities/resFormat.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      const error = resFormat({
        status: "fail",
        code: 401,
        path: req.originalUrl,
        reqId: req.requestId,
        message: "Authentication token missing",
      });
      res.status(401).send(error);
    }

    const decode = jwt.verify(token, "secretKey");
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      const error = resFormat({
        status: "fail",
        code: 401,
        path: req.originalUrl,
        reqId: req.requestId,
        message: "Invalid or expired token",
      });
      res.status(401).send(error);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 401,
      path: req.originalUrl,
      reqId: req.requestId,
      message: "Authentication failed",
    });
    res.status(401).send(error);
  }
};

export default auth;
