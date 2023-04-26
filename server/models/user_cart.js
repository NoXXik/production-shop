'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class UserCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, UserCart, Product, UserCartRefProduct}) {
      // define association here
      UserCart.belongsTo(User, {foreignKey: 'user_id'})
      UserCart.belongsToMany(Product, {through: UserCartRefProduct, foreignKey: 'cart_id', otherKey: 'product_id'})
    }
  }
  UserCart.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true },
    user_id: { type:DataTypes.UUID, primaryKey: true, unique: true }
  }, {
    sequelize,
    tableName: 'user_carts',
    timestamps: false,
  });
  return UserCart;
};
