import {User} from "../models/index.js";
// import auth from "../middleware/auth.js";
import resFormat from "../utilities/resFormat.js";

// get all the users by default,
// additionally can pass email, name or role as query parameter
// example: http://localhost:3000/api/users?name=gautham&email=gautham.p@pacewisdom.com&role=admin
export const getUsers = async (req, res) => {
  try {
    const query = {};

    if (req.query.email) {
      query.email = req.query.email;
    }
    if (req.query.name) {
      // case insensitive matching
      query.name = {$regex: req.query.name, $options: "i"};
    }
    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query);

    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: users,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// create new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();

    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: user,
    });

    res.status(201).send({data, token});
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// updated user by id
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: user,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// delete user by id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error(`User '${req.params.id}' not found`);
    }
    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: user,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};
