'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const Reviews = require('./productreviews')
const db = require("../database/database");
module.exports = (sequelize) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Product, Reviews}) {
            // define association here
            Product.belongsToMany(Product, {as: 'RelProducts',through: 'products_ref_rel_products', foreignKey: 'product_id', otherKey: 'rel_product_id'})
            Product.hasMany(Reviews, {foreignKey: 'product_id'})
        }
    }

    Product.init({
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1  },
        title: { type: DataTypes.STRING, unique: true  },
        meta_title: { type: DataTypes.STRING  },
        title_translit: { type: DataTypes.STRING  },
        vendor_code: { type: DataTypes.STRING  },
        description: { type: DataTypes.TEXT },
        meta_description: { type: DataTypes.TEXT },
        category_name: { type: DataTypes.STRING },
        category_id: {type: DataTypes.INTEGER, allowNull: false},
        product_filters: { type: DataTypes.JSONB },
        images: { type: DataTypes.ARRAY(DataTypes.STRING) },
        currently_price: { type: DataTypes.FLOAT },
        stock_count: { type: DataTypes.INTEGER },
        stock_status: { type: DataTypes.STRING },
        characteristics: { type: DataTypes.JSON },
        files: { type: DataTypes.ARRAY(DataTypes.STRING) },
        rating: { type: DataTypes.FLOAT, defaultValue: 0.0 },
        reviews_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        orders_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        discount: { type: DataTypes.JSON, allowNull: true },
        new_label: { type: DataTypes.BOOLEAN, defaultValue: false },
        hit_label: { type: DataTypes.BOOLEAN, defaultValue: false },
        width: { type: DataTypes.FLOAT },
        length: { type: DataTypes.FLOAT },
        height: { type: DataTypes.FLOAT },
        weight: { type: DataTypes.FLOAT },
        deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE },
     }, {
        sequelize,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'products',
    });
    return Product;
};
