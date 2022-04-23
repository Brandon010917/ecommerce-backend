const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { filterObj } = require("../utils/filterObj");
const { Product } = require("../models/product.model");
const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    user
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    newUser
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const data = filterObj(req.body, "username", "email");

  await user.update({ ...data });

  res.status(204).json({
    status: "success"
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: "deleted"
  });

  res.status(204).json({
    status: "success"
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user given an email and has status active
  const user = await User.findOne({
    where: {
      email,
      status: "active"
    }
  });

  // Compare entered password vs hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(498, "Email or password invalid"));
  }

  // Create JWT
  const token = await jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: "success",
    token
  });
});

exports.productsCurrentUser = catchAsync(async (req, res, next) => {
  const { id } = req.currentUser;

  const products = await Product.findAll({
    where: {
      userId: id,
      status: "active"
    }
  });

  res.status(200).json({
    status: "success",
    products
  });
});

exports.getOrdersUser = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: { status: "purchased" },
    include: [
      {
        model: Cart
      }
    ]
  });
});

exports.getOrdersUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
});
