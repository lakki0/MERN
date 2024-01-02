const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample",
      url: "url",
    },
  });

  sendToken(user, 200, res);
});

// login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  sendToken(user, 201, res);
});

// logout
exports.logout = catchAsyncError(async (req, res, next) => {
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
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // get resetpassword token
  const resetToken = user.getResetPasswordToken();
  //   console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;
  //   console.log(resetPasswordUrl);

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not
                    request to this mail then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password -----------------------------

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not Match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get user details -------------------

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
