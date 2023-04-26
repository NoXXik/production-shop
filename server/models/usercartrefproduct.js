'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class UserCartRefProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserCartRefProduct, Product}) {
      // define association here
      // UserCartRefProduct.hasMany(Product, {foreignKey: 'product_id'})
    }
  }
  UserCartRefProduct.init({
    cart_id: {type: DataTypes.BIGINT, primaryKey: true},
    product_id: {type: DataTypes.UUID, primaryKey: true},
    count: {type: DataTypes.INTEGER}
  }, {
    sequelize,
    tableName: 'user_cart_ref_products',
    timestamps: false,
  });
  return UserCartRefProduct;
};
