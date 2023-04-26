'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class ProductSwiperRefProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  ProductSwiperRefProducts.init({
    swiper_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.UUID, primaryKey: true},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'product_swipers_ref_products',
  });
  return ProductSwiperRefProducts;
};
