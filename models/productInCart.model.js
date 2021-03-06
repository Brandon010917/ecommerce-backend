const { DataTypes } = require("sequelize");

// Utils
const { sequelize } = require("../utils/database");

const ProductInCart = sequelize.define("productInCart", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { ProductInCart };
