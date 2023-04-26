'use strict';
const {
  Model, DataTypes: DataTypess
} = require('sequelize');
const {db} = require("../database/database");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Filter, CategoryFilter}) {
      // define association here
      Category.belongsToMany(Filter, {through: CategoryFilter, foreignKey: 'category_id', otherKey: 'filter_id'})
    }
  }
  Category.init({
    id: {type: DataTypess.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypess.STRING, require: true},
    image: {type: DataTypess.STRING, require: true},
    translit: {type: DataTypess.STRING, require: true},
    parent_id: {type: DataTypess.INTEGER, allowNull: true},
    description: { type: DataTypess.TEXT },
    created_at: { type: DataTypess.DATE },
    updated_at: { type: DataTypess.DATE }
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'categories',
  });
  return Category;
};
