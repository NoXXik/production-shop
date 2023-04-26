'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class UserOrderRefProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserOrder, UserOrderRefProduct, Product}) {
      // define association here
      // UserOrderRefProduct.belongsTo(UserOrder, {foreignKey: 'order_id'})
      // UserOrderRefProduct.hasMany(Product, {foreignKey: 'product_id'})
    }
  }
  UserOrderRefProduct.init({
    order_id: {type: DataTypes.UUID},
    product_id: {type: DataTypes.UUID},
    quantity: { type: DataTypes.BIGINT, allowNull: false},
    sum: { type: DataTypes.FLOAT(10,2)},
    cost: { type: DataTypes.FLOAT(10,2)},
    discount: { type: DataTypes.JSON, allowNull: true}
  }, {
    sequelize,
    tableName: 'user_order_ref_products',
    timestamps: false,
  });
  return UserOrderRefProduct;
};
