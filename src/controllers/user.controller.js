import {User} from "../models/index.js";
// import auth from "../middleware/auth.js";
import resFormat from "../utilities/resFormat.js";
import prisma from "../prisma.js";
import {
  generateAuthToken,
  findByCredentials,
  toJSON,
  createNewUser,
} from "../services/user.service.js";

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
      // query.name = {$regex: req.query.name, $options: "i"};

      //prisma equivalent
      query.name = {contains: req.query.name, mode: "insensitive"};
    }
    if (req.query.role) {
      query.role = req.query.role;
    }

    // const users = await User.find(query);

    //prisma equivalent
    const users = await prisma.users.findMany({
      where: query,
    });

    const santisedData = users.map((value) => {
      return toJSON(value);
    });

    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: santisedData,
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

export const createUser = async (req, res) => {
  try {
    const user = await createNewUser(req.body);
    const token = await generateAuthToken(user);

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

// create new user
// export const createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const token = await user.generateAuthToken();

//     user.createdBy = req.user._id;
//     user.updatedBy = req.user._id;

//     await user.save();

//     const data = resFormat({
//       status: "pass",
//       code: 200,
//       path: req.originalUrl,
//       reqId: req.requestId,
//       message: user,
//     });

//     res.status(201).send({data, token});
//   } catch (e) {
//     const error = resFormat({
//       status: "fail",
//       code: 400,
//       path: req.originalUrl,
//       reqId: req.requestId,
//       message: e.message,
//     });
//     res.status(400).send(error);
//   }
// };

// updated user by id
export const updateUser = async (req, res) => {
  try {
    const {createdAt, createdBy, ...updateFields} = req.body;

    updateFields.updatedAt = new Date();
    updateFields.updatedBy = req.user._id;

    const user = await User.findByIdAndUpdate(req.params.id, updateFields, {
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
