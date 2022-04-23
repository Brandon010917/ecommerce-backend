const express = require("express");

// Controllers
const {
  createNewUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  productsCurrentUser
} = require("../controllers/users.controller");

// Middlewares
const { validateSession } = require("../middlewares/auth.middleware");
const {
  userExists,
  protectAccountOwner
} = require("../middlewares/users.middleware");
const {
  createUserValidators,
  validateResult
} = require("../middlewares/validators.middleware");

// Init router
const router = express.Router();

router.post("/", createUserValidators, validateResult, createNewUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/me", productsCurrentUser);

router
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router
};
