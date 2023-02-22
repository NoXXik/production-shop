const sequelize = require('../database/database')
const {DataTypes, Sequelize} = require('sequelize')


// const User = sequelize.define('user', {
//     id: {type: DataTypes.UUIDV4, primaryKey: true, unique: true},
//     email: {type: DataTypes.STRING, unique: true},
//     password: {type: DataTypes.STRING},
//     phone_number: {type: DataTypes.STRING, unique: true},
//     user_group: {type: DataTypes.STRING, defaultValue: "USER"},
//     ip_address: {type: DataTypes.STRING, defaultValue: "0.0.0.0"},
//     status: {type: DataTypes.STRING, defaultValue: "ACTIVE"},
//     discount: {type: DataTypes.ARRAY},
//     role: {type: DataTypes.STRING, defaultValue: "USER"}
// })
//
// const Product = sequelize.define('product', {
//     id: {type: DataTypes.UUIDV4, primaryKey: true, unique: true},
//     short_name: {type: DataTypes.STRING},
//     long_name: {type: DataTypes.STRING},
//     articule: {type: DataTypes.STRING},
//     description: {type: DataTypes.TEXT},
//     images: {type: DataTypes.ARRAY},
//     currently_price: {type: DataTypes.FLOAT, defaultValue: 0.0},
//     old_price: {type: DataTypes.STRING, defaultValue: null},
//     stock_count: {type: DataTypes.NUMBER},
//     characteristics: {type: DataTypes.ARRAY},
//     seo_attributes: {type: DataTypes.ARRAY},
//     manufacturer: {type: DataTypes.STRING},
//     labels: {type: DataTypes.ARRAY},
//     documents: {type: DataTypes.ARRAY},
//     files: {type: DataTypes.ARRAY},
//     rating: {type: DataTypes.FLOAT, defaultValue: 0.0},
//     views: {type: DataTypes.NUMBER},
//     orders_count: {type: DataTypes.NUMBER},
//     display: {type: DataTypes.BOOLEAN, defaultValue: true},
//     category: {type: DataTypes.ARRAY},
//     reviews: {type: DataTypes.ARRAY},
// })

const User = sequelize.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    email: {type: DataTypes.STRING, unique: true},
    hash_password: {type: DataTypes.STRING},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'CUSTOMER'},
    discount: {type: DataTypes.JSON}

})

const Product = sequelize.define('product', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    title: {type: DataTypes.STRING, unique: true},
    meta_title: {type: DataTypes.STRING},
    title_translit: {type: DataTypes.STRING},
    vendor_code: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    meta_description: {type: DataTypes.TEXT},
    category_name: {type: DataTypes.STRING},
    product_filters: {type: DataTypes.JSONB},
    images: {type: DataTypes.ARRAY(DataTypes.STRING)},
    currently_price: {type: DataTypes.FLOAT},
    stock_count: {type: DataTypes.INTEGER},
    stock_status: {type: DataTypes.STRING},
    characteristics: {type: DataTypes.JSON},
    files: {type: DataTypes.ARRAY(DataTypes.STRING)},
    rating: {type: DataTypes.FLOAT, defaultValue: 0.0},
    reviews_count: {type: DataTypes.INTEGER, defaultValue: 0},
    orders_count: {type: DataTypes.INTEGER, defaultValue: 0},
    discount: {type: DataTypes.JSON, allowNull: true},
    new_label: {type: DataTypes.BOOLEAN, defaultValue: false},
    hit_label: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const ProductReviews = sequelize.define('product_reviews', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.UUID},
    user_name: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    rating: {type: DataTypes.FLOAT},
    description: {type: DataTypes.TEXT},

})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, require: true},
    translit: {type: DataTypes.STRING, require: true},
    parent_id: {type: DataTypes.INTEGER, allowNull: true},
})

const Filter = sequelize.define('filter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, require: true},
    translit: {type: DataTypes.STRING, require: true},
    values: {type: DataTypes.JSON}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CategoryFilter = sequelize.define('category_filter', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    categoryId: {type: DataTypes.INTEGER},
    filterId: {type: DataTypes.INTEGER}
})

const CharacteristicsTemplates = sequelize.define('characteristic_template', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    char_list: {type: DataTypes.JSON}
})

// User.hasOne(Basket)
// Basket.belongsTo(User)
//
// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)
//
// Product.hasOne(BasketDevice)
// BasketDevice.belongsTo(Product)


Product.hasMany(ProductReviews, {foreignKey: 'product_id'})

User.hasOne(Basket)
Basket.belongsTo(User, {foreignKey: 'userId'})

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Product.hasMany(BasketDevice)
BasketDevice.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

// Product.belongsToMany(Filter, {through: ProductFilter})
// Filter.belongsToMany(Product, {through: ProductFilter})

Category.belongsToMany(Filter, {through: CategoryFilter})
Filter.belongsToMany(Category, {through: CategoryFilter})


module.exports = {
    User,
    Product,
    Category,
    BasketDevice,
    Basket,
    Filter,
    CategoryFilter,
    ProductReviews,
    CharacteristicsTemplates,
}
