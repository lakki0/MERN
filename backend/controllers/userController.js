const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
  });
});

// login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Please enter email & password",400));
  }
  
  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid email and password",401))
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid email and password",401))
  }

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
  });
});
