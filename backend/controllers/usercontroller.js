const User = require("../modules/usermodules");
const CatchAsyncError = require("../middleware/catchasyncerror");
const ErrorHandler = require("../util/errorhendler");
const SendToken = require("../util/jwttoken");
const sendEmail = require("../util/sendemil");
const errorhandler = require("../util/errorhendler");
const Crypto = require("crypto");
const catchasyncerror = require("../middleware/catchasyncerror");
const cloudinary = require("cloudinary").v2;

// Register User

exports.RegisterUser = CatchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (avatar) {
    const result = await cloudinary.uploader.upload(avatar[0], {
      folder: "avatar",
    });
    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: result.public_id, url: result.secure_url },
    });
    user.password = undefined;
    SendToken(user, 201, res);
  } else {
    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "", url: "" },
    });
    user.password = undefined;
    SendToken(user, 201, res);
  }
});

// User Login

exports.LoginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Please enter email & password", 401));
  }

  const isPasswordMatch = await user.comparepassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Please enter email & password", 401));
  }

  user.password = undefined;
  SendToken(user, 200, res);
});

//user Logout

exports.LogOutUser = CatchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// forgot password

exports.ForgotPassword = CatchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your reset password token is :-\n\n ${resetPasswordUrl} \n\n if you not request this email then 
  please ignore this `;

  try {
    await sendEmail({
      email: user.email,
      message,
      subject: "Ecommmerce password recovery",
    });
    res.status(200).json({
      success: true,
      message: `Email sends to ${user.email} successfully `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new errorhandler(error.message, 500));
  }
});

// reset password

exports.ResetPassword = CatchAsyncError(async (req, res, next) => {
  const resetPasswordToken = Crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorhandler("reset token is invaild or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next("password does not match", 400);
  }
  (user.password = req.body.password), (user.resetPasswordToken = undefined);
  user.resetPasswordExpire = undefined;

  await user.save();

  SendToken(user, 200, res);
});

// Get user details

exports.GetUserDetails = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password

exports.UpdatePassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatch = await user.comparepassword(req.body.oldpassword);
  if (!isPasswordMatch) {
    return next(new errorhandler("Old password not match", 400));
  }

  if (req.body.newpassword !== req.body.confirmpassword) {
    next(new errorhandler("password does not match", 400));
  }

  user.password = req.body.newpassword;
  await user.save();

  SendToken(user, 200, res);
});

exports.UpdateUserDetails = catchasyncerror(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindfAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// get users (admin)
exports.GetAllUsers = CatchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// get user details (adimn)

exports.GetUserDetailsAdmin = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new errorhandler(`User does not exist with ID:${req.params.id} `)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update users details (admin)

exports.UpdateUserDetails = catchasyncerror(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindfAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "user Updated successfully",
  });
});

// delete user (admin)

exports.DeleteUser = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorhandler(`User does not exist eith ID : ${req.params.id}`)
    );
  }
  await user.remove();
  res.status(200).json({
    succes: true,
    message: "user Deleted successfully",
  });
});

exports.EditUserDetails = CatchAsyncError(async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const user = await User.findById(req.user._id);


  if (avatar.length) {
    if (user.avatar.public_id !== "") {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result = await cloudinary.uploader.upload(avatar[0], {
      folder: "avatar",
    });

  
    user.avatar.public_id = result.public_id;
    user.avatar.url = result.url;
    await user.save();
  }

  const updateduser = await User.findByIdAndUpdate(
    req.user._id,
    { name: name, email: email },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    user: updateduser,
  });
});
