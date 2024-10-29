// // user management service logics are defined here

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import userSchema from "../models/user.schema.js";
// import {User} from "../models/index.js";

// // custom method to generate auth token
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({_id: user._id.toString()}, "secretKey");
//   user.tokens = user.tokens.concat({token});
//   await user.save();
//   return token;
// };

// // custom method to convert response to JSON
// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.tokens;
//   return user;
// };

// // custom method to validate user by email and password
// userSchema.statics.findByCredentials = async (email, password) => {
//   try {
//     const user = await User.findOne({email});

//     if (!user) {
//       return {status: "error", message: "user not found"};
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return {status: "error", message: "invalid credentials"};
//     }
//     return user;
//   } catch (e) {
//     return {status: "error", message: e.message};
//   }
// };

// // function to hash password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// prisma equivalent

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// Generate auth token
// export const generateAuthToken = async (user) => {
//   const token = jwt.sign({id: user.id}, "secretKey");
//   await prisma.users.update({
//     where: {id: user.id},
//     data: {tokens: {push: token}},
//   });
//   return token;
// };

// Remove sensitive information before returning user data
export const toJSON = (user) => {
  const {password, tokens, ...userWithoutSensitiveInfo} = user;
  return userWithoutSensitiveInfo;
};

export const generateAuthToken = async (user) => {
  const token = jwt.sign({id: user.id}, "secretKey");

  // Fetch existing tokens, add the new one, and update
  const currentUser = await prisma.users.findUnique({where: {id: user.id}});
  const tokens = currentUser.tokens || [];
  tokens.push(token);

  await prisma.users.update({
    where: {id: user.id},
    data: {tokens},
  });

  return token;
};

// Validate user by email and password
export const findByCredentials = async (email, password) => {
  const user = await prisma.users.findUnique({where: {email}});
  if (!user) {
    return {status: "error", message: "User not found"};
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {status: "error", message: "Invalid credentials"};
  }
  return user;
};

export const createUser = async (userData) => {
  const {password, ...otherUserData} = userData;
  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await prisma.users.create({
    data: {...otherUserData, password: hashedPassword},
  });
  return toJSON(user);
};
