const mongoose = require("mongoose");
const Validator = require("validator");
const BcryptJS = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const Crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name required"],
    maxlength: [30, "name cannot exceed 30 charecters"],
    minlength: [4, "name should have more then 4 charecters"],
  },
  email: {
    type: String,
    required: [true, "user email required"],
    unique: true,
    validate: [Validator.isEmail, "please enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "password should be greater then 8 charecters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default:'eqjb4qlsj33tvmwck3ag'
    
    },
    url: {
      type: String,
      default:'https://res.cloudinary.com/dvbevptl7/image/upload/v1652707664/avatar/eqjb4qlsj33tvmwck3ag.jpg'
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await BcryptJS.hash(this.password, 10);
});

UserSchema.methods.getJwtToken = function () {
  return jwtToken.sign({ _id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//compare password
UserSchema.methods.comparepassword = function (enterdpassword) {
  return BcryptJS.compare(enterdpassword, this.password);
};

// generating password reset token

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = Crypto.randomBytes(20).toString("hex");

  // hashing and adding resetpassword token to userSchema
  this.resetPasswordToken = Crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
