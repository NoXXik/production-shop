'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Reviews, User, Product}) {
      Reviews.belongsTo(User, { foreignKey: 'user_id'})
      Reviews.belongsTo(Product, { foreignKey: 'product_id'})
    }
  }
  Reviews.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.UUID},
    user_id: { type: DataTypes.UUID },
    user_name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    rating: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'reviews',
  });
  return Reviews;
};
