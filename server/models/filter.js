'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class Filter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Filter, Category, CategoryFilter}) {
      // define association here
      Filter.belongsToMany(Category, {through: CategoryFilter, foreignKey: 'category_id', otherKey: 'filter_id'})
    }
  }
  Filter.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, require: true},
    translit: {type: DataTypes.STRING, require: true},
    values: {type: DataTypes.JSON},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'filters',
  });
  return Filter;
};
