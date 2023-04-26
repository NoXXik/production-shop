'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, UserFavorite, UserFavoriteRefProduct, Product}) {
      // define association here
      UserFavorite.belongsTo(User, {foreignKey: 'user_id'})
      UserFavorite.belongsToMany(Product, {through: UserFavoriteRefProduct, foreignKey: 'favorite_id', otherKey: 'product_id'})
    }
  }
  UserFavorite.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true },
    user_id: { type: DataTypes.UUID, primaryKey: true, unique: true}
  }, {
    sequelize,
    tableName: 'user_favorites',
    timestamps: false
  });
  return UserFavorite;
};
