'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class ProductSwiper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, ProductSwiper, ProductSwiperRefProducts}) {
      // define association here
      ProductSwiper.belongsToMany(Product, {through: ProductSwiperRefProducts, foreignKey: 'swiper_id', otherKey: 'product_id'})
    }
  }
  ProductSwiper.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    title: {type: DataTypes.STRING},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'product_swipers',
  });
  return ProductSwiper;
};
