'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class CharTemplates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CharTemplates.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true},
    title: {type: DataTypes.STRING, allowNull: false},
    charList: {type: DataTypes.JSON},
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'char_templates',
  });
  return CharTemplates;
};
