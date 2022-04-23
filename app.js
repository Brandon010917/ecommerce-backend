const express = require("express");

// Routes
const { usersRouter } = require("./routes/users.routes");
const { productsRouter } = require("./routes/products.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Utils
const { AppError } = require("./utils/appError");

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

// Handle Errors
app.use("*", (req, res, next) => {
  return next(
    new AppError(404, `${req.originalUrl} not found in this server.`)
  );
});

app.use(globalErrorHandler);

module.exports = { app };
