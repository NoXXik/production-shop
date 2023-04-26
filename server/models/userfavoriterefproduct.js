'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize, DataTypes) => {
  class UserFavoriteRefProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserFavoriteRefProduct, UserFavorite, Product}) {
      // define association here
      UserFavoriteRefProduct.belongsTo(UserFavorite, {foreignKey: 'favorite_id'})
      // UserFavoriteRefProduct.hasMany(Product, {foreignKey: 'product_id'})
    }
  }
  UserFavoriteRefProduct.init({
    favorite_id: {type: DataTypes.BIGINT, primaryKey: true},
    product_id: {type: DataTypes.UUID, primaryKey: true},
  }, {
    sequelize,
    tableName: 'user_favorite_ref_products',
    timestamps: false,
  });
  return UserFavoriteRefProduct;
};
