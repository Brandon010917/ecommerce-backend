// Models
const { Product } = require("../models/product.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id, status: "active" },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!product) {
    return next(new AppError(404, "Can't find product with the given id"));
  }

  req.product = product;

  next();
});