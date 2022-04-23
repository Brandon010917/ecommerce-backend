const jwt = require("jsonwebtoken");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { promisify } = require("util");

exports.validateSession = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError(401, "Invalid session"));
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: {
      id: decodedToken.id,
      status: "active"
    },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!user) next(new AppError(401, "Invalid session"));

  req.currentUser = user;

  next();
});
