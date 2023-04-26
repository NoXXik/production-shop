'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Reviews, UserCart, User_lk, UserFavorite, UserOrder}) {
      // define association here
      User.hasMany(Reviews, {foreignKey: 'user_id'})
      User.hasMany(UserOrder, {foreignKey: 'user_id'})
      User.hasOne(UserCart, {foreignKey: 'user_id'})
      User.hasOne(UserFavorite, {foreignKey: 'user_id'})
      User.hasOne(User_lk, {foreignKey: 'user_id'})
    }
  }
  User.init({
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone: {type: DataTypes.STRING},
    full_name: {type: DataTypes.STRING},
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE},
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
  });
  return User;
};
