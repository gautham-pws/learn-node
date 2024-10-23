const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import userSchema from "../models/user.schema";
import User from "../models";

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, "secretKey");
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
  try {
    //		const user = await User.findOne({email})
    const user = await User.findOne({email});

    if (!user) {
      return {status: "error", message: "user not found"};
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {status: "error", message: "invalid credentials"};
    }
    return user;
  } catch (e) {
    return {status: "error", message: e.message};
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
