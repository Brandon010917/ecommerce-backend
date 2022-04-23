const express = require("express");
const {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createNewProduct
} = require("../controllers/products.controller");

// Controllers

// Middlewares
const { validateSession } = require("../middlewares/auth.middleware");
const { productExists } = require("../middlewares/products.middleware");
const {
  createProductValidators
} = require("../middlewares/validators.middleware");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllProducts)
  .post(createProductValidators, createNewProduct);

router
  .use("/:id", productExists)
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = {
  productsRouter: router
};
