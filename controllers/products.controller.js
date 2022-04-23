// Models
const { Product } = require("../models/product.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: "active" }
  });

  res.status(200).json({ status: "success", products });
});

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const { id } = req.currentUser;

  const { title, description, quantity, price } = req.body;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: +id
  });

  res.status(201).json({ status: "success", newProduct });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({ status: "success", product });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const data = filterObj(req.body, "title", "description", "quantity", "price");

  await product.update({ ...data });

  res.status(204).json({ status: "success" });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "deleted" });

  res.status(200).json({ status: "success" });
});
