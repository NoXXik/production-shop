'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class SupportOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SupportOrder.init({
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true},
    email: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    full_name: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    text: {type: DataTypes.TEXT},
    status: {type: DataTypes.STRING, defaultValue: 'В очереди'},
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'SupportOrder',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'support_orders',
  });
  return SupportOrder;
};
