// Models
const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { ProductInCart } = require("../models/productInCart.model");
const { User } = require("../models/user.model");

const initModels = () => {
  // 1 User <-----> M Products
  User.hasMany(Product);
  Product.belongsTo(User);

  // 1 User <-----> M Orders
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <-----> 1 Cart
  User.hasOne(Cart);
  Cart.belongsTo(User);

  // 1 Order <-----> 1 Cart
  Cart.hasOne(Order);
  Order.belongsTo(Cart);

  // M Cart <-----> M Products
  Cart.belongsToMany(Product, { through: ProductInCart });
  Product.belongsToMany(Cart, { through: ProductInCart });
};

module.exports = { initModels };
