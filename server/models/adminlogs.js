'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
const db = require("../database/database");
module.exports = (sequelize) => {
    class AdminLogs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Admin, AdminLogs}) {
            // define association here
            AdminLogs.belongsTo(Admin, {foreignKey: 'admin_id'})
        }
    }

    AdminLogs.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        admin_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false},
        log: { type: DataTypes.JSON},
        route: { type: DataTypes.STRING}
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'admin_logs',
    });
    return AdminLogs;
};
