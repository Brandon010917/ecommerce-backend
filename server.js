const { app } = require("./app");

// Utils
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

// Authentication sequelize
sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

// Init relations
initModels();

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
