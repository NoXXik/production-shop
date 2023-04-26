'use strict';
const {
  Model, DataTypes, DataTypess
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class CategoryFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryFilter.init({
    category_id: {type: DataTypes.INTEGER, primaryKey: true},
    filter_id: {type: DataTypes.INTEGER, primaryKey: true},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
  }, {
    sequelize,
    tableName: 'category_ref_filters',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return CategoryFilter;
};
