'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Admin, AdminLogs}) {
      // define association here
      Admin.hasMany(AdminLogs, {foreignKey: 'admin_id'})
    }
  }
  Admin.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
    login: { type: DataTypes.STRING, allowNull: false},
    hash_password: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false},
    first_name: { type: DataTypes.STRING, allowNull: true},
    last_name: { type: DataTypes.STRING, allowNull: true},
    access: { type: DataTypes.JSON, allowNull: true, defaultValue: null},
    is_super_admin: { type: DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'admins',
  });
  return Admin;
};
