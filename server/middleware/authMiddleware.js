const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token || token === 'null')
    return next(new AppError('User is not logged in', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('User does not exist', 401));

  if (await freshUser.changedPasswordAfter(decoded.iat))
    return next(new AppError('Password was changed. Login again', 401));

  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    next();
  };
};
