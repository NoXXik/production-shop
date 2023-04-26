'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class User_lk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_lk.init({
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    hash_password: {type: DataTypes.STRING},
    discount: {type: DataTypes.JSON, allowNull: true},
    banned: {type: DataTypes.BOOLEAN, defaultValue: false},
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE},
    user_id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: true}
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users_lk',
  });
  return User_lk;
};
