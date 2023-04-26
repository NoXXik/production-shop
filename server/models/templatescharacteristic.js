'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class TemplatesCharacteristic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TemplatesCharacteristic.init({
    id: {type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING},
    template: {type: DataTypes.JSON},
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE},
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'template_characteristic',
    modelName: 'TemplatesCharacteristic',
  });
  return TemplatesCharacteristic;
};
