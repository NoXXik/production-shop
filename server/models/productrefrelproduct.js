'use strict';
const {
  Model, DataTypes, DataTypess
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class ProductRefRelProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductRefRelProduct.init({
    product_id: { type: DataTypes.UUID, primaryKey: true },
    rel_product_id: { type: DataTypes.UUID, primaryKey: true},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
  }, {
    sequelize,
    tableName: 'products_ref_rel_products',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ProductRefRelProduct;
};
