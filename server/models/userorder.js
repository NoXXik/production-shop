'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class UserOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, UserOrder, Product, UserOrderRefProduct}) {
      // define association here
      UserOrder.belongsTo(User, {foreignKey: 'user_id'})
      UserOrder.belongsToMany(Product, {through: UserOrderRefProduct, foreignKey: 'order_id', otherKey: 'product_id'})
    }
  }
  UserOrder.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
    invId: { type: DataTypes.BIGINT, unique: true, autoIncrement: true}, // Поле идентификатора ордера в системе robokassa
    user_id: { type: DataTypes.UUID},
    payment_status: { type: DataTypes.STRING, defaultValue: 'В процессе'}, // В процессе | Выполнена | Отменена
    delivery: { type: DataTypes.JSON},
    delivery_status: { type: DataTypes.STRING, defaultValue: 'Ожидает отправки'}, // Ожидает отправки | Отправлен | Доставлен
    total_cost: {type: DataTypes.FLOAT},
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_orders',
  });
  return UserOrder;
};
