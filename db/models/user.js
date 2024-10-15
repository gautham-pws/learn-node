const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const uri =
//   "mongodb+srv://gauthamp:Er4Dz26iRlHxI11c@cluster0.gjgpd.mongodb.net/project0?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(uri);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 14) {
        throw new Error("You must be at least 14 years old to continue");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  //   tokens: [
  //     {
  //       token: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
});

// usersSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.tokens;
//   return user;
// };

// usersSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = await jwt.sign({_id: user._id.toString()}, "secretKey");
//   user.tokens = user.tokens.concat({token});
//   await user.save();
//   return token;
// };

// usersSchema.statics.findByCredentials = async (email, password) => {
//   try {
//     //		const user = await User.findOne({email})
//     const user = await User.findOne({email});

//     if (!user) {
//       return "user not found";
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return "invalid credentials";
//     }
//     return user;
//   } catch (e) {
//     return e.message;
//   }
// };

// usersSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
