'use strict';

const {DataTypes, DataTypess} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('products',
            {
                id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
                title: {type: DataTypes.STRING, unique: true},
                meta_title: {type: DataTypes.STRING},
                title_translit: {type: DataTypes.STRING, primaryKey: true},
                vendor_code: {type: DataTypes.STRING},
                description: {type: DataTypes.TEXT},
                meta_description: {type: DataTypes.TEXT},
                category_name: {type: DataTypes.STRING},
                category_id: {type: DataTypes.INTEGER},
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
                hit_label: {type: DataTypes.BOOLEAN, defaultValue: false},
                width: { type: DataTypes.FLOAT },
                length: { type: DataTypes.FLOAT },
                height: { type: DataTypes.FLOAT },
                weight: { type: DataTypes.FLOAT },
                deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        );
        await queryInterface.createTable('products_ref_rel_products',
            {
                product_id: { type: DataTypes.UUID, primaryKey: true },
                rel_product_id: { type: DataTypes.UUID, primaryKey: true},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('users',
            {
                id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
                email: {type: DataTypes.STRING, unique: true, allowNull: false},
                phone: {type: DataTypes.STRING},
                full_name: {type: DataTypes.STRING},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('users_lk',
            {
                id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
                email: {type: DataTypes.STRING, unique: true},
                hash_password: {type: DataTypes.STRING},
                discount: {type: DataTypes.JSON, allowNull: true},
                banned: {type: DataTypes.BOOLEAN, defaultValue: false},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
                user_id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: true}
            }
        )
        await queryInterface.createTable('reviews',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                product_id: {type: DataTypes.UUID},
                user_id: {type: DataTypes.UUID},
                user_name: {type: DataTypes.STRING},
                description: {type: DataTypes.TEXT},
                rating: {type: DataTypes.INTEGER},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('categories',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                title: {type: DataTypes.STRING, require: true},
                translit: {type: DataTypes.STRING, require: true},
                image: {type: DataTypes.STRING, require: true},
                parent_id: {type: DataTypes.INTEGER, allowNull: true},
                description: {type: DataTypes.TEXT},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE}
            }
        )
        await queryInterface.createTable('filters',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                title: {type: DataTypes.STRING, require: true},
                translit: {type: DataTypes.STRING, require: true},
                values: {type: DataTypes.JSON},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('category_ref_filters',
            {
                category_id: {type: DataTypes.INTEGER, primaryKey: true},
                filter_id: {type: DataTypes.INTEGER, primaryKey: true},
                created_at: { type: DataTypes.DATE },
                updated_at: { type: DataTypes.DATE }
            }
        )
        await queryInterface.createTable('user_carts',
            {
                id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true},
                user_id: {type: DataTypes.UUID, primaryKey: true, unique: true}
            }
        )
        await queryInterface.createTable('user_favorites',
            {
                id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true},
                user_id: {type: DataTypes.UUID, primaryKey: true, unique: true}
            }
        )
        await queryInterface.createTable('user_cart_ref_products',
            {
                cart_id: {type: DataTypes.BIGINT, primaryKey: true},
                product_id: {type: DataTypes.UUID, primaryKey: true},
                count: {type: DataTypes.INTEGER}
            }
        )
        await queryInterface.createTable('user_favorite_ref_products',
            {
                favorite_id: {type: DataTypes.BIGINT, primaryKey: true},
                product_id: {type: DataTypes.UUID, primaryKey: true},
            }
        )
        await queryInterface.createTable('user_orders',
            {
                id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
                invId: {type: DataTypes.BIGINT, unique: true, autoIncrement: true}, // Поле идентификатора ордера в системе robokassa
                user_id: {type: DataTypes.UUID},
                payment_status: {type: DataTypes.STRING, defaultValue: 'В процессе'}, // В процессе | Выполнена | Отменена
                delivery: {type: DataTypes.JSON},
                delivery_status: {type: DataTypes.STRING, defaultValue: 'Ожидает отправки'}, // Ожидает отправки | Отправлен | Доставлен
                total_cost: {type: DataTypes.FLOAT},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('user_order_ref_products',
            {
                order_id: {type: DataTypes.UUID},
                product_id: {type: DataTypes.UUID},
                quantity: {type: DataTypes.BIGINT, allowNull: false},
                sum: {type: DataTypes.FLOAT(10, 2)},
                cost: {type: DataTypes.FLOAT(10, 2)},
                discount: {type: DataTypes.JSON, allowNull: true}
            }
        )
        await queryInterface.createTable('admins',
            {
                id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1, unique: true},
                login: {type: DataTypes.STRING, allowNull: false},
                hash_password: {type: DataTypes.STRING, allowNull: false},
                email: {type: DataTypes.STRING, allowNull: false},
                first_name: {type: DataTypes.STRING, allowNull: true},
                last_name: {type: DataTypes.STRING, allowNull: true},
                access: { type: DataTypes.JSON, allowNull: true, defaultValue: null},
                is_super_admin: {type: DataTypes.BOOLEAN, defaultValue: false},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('admin_logs',
            {
                id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
                admin_id: {type: DataTypes.UUID, primaryKey: true, allowNull: false},
                log: {type: DataTypes.JSON},
                route: {type: DataTypes.STRING},
                created_at: {type: DataTypes.DATE},
                updated_at: {type: DataTypes.DATE},
            }
        )
        await queryInterface.createTable('template_characteristic', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            template: {type: DataTypes.JSON},
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.createTable('product_swipers', {
            id: {type: DataTypes.INTEGER, autoIncrement: true, unique: true},
            title: {type: DataTypes.STRING},
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        });
        await queryInterface.createTable('product_swipers_ref_products', {
            swiper_id: { type: DataTypes.INTEGER, primaryKey: true },
            product_id: { type: DataTypes.UUID, primaryKey: true},
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE }
        });

        await queryInterface.createTable('support_orders', {
            id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unique: true},
            email: {type: DataTypes.STRING},
            phone: {type: DataTypes.STRING},
            full_name: {type: DataTypes.STRING},
            title: {type: DataTypes.STRING},
            text: {type: DataTypes.TEXT},
            status: {type: DataTypes.STRING, defaultValue: 'В очереди'},
            created_at: {type: DataTypes.DATE},
            updated_at: {type: DataTypes.DATE},
        });
        // Настройка связей между таблицами

        await queryInterface.addConstraint('category_ref_filters', {
            fields: ['category_id'],
            type: 'foreign key',
            name: 'category_ref_filters_category_id',
            references: { table: 'categories', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('category_ref_filters', {
            fields: ['filter_id'],
            type: 'foreign key',
            name: 'category_ref_filters_filters',
            references: { table: 'filters', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('products', {
            fields: ['category_id'],
            type: 'foreign key',
            name: 'products_category_id',
            references: { table: 'categories', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('products_ref_rel_products', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'products_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('products_ref_rel_products', {
            fields: ['rel_product_id'],
            type: 'foreign key',
            name: 'products_rel_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        //
        await queryInterface.addConstraint('product_swipers_ref_products', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'swiper_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('product_swipers_ref_products', {
            fields: ['swiper_id'],
            type: 'foreign key',
            name: 'swiper_swiper_id',
            references: { table: 'product_swipers', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('reviews', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'reviews_user_id',
            references: { table: 'users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('reviews', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'reviews_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('admin_logs', {
            fields: ['admin_id'],
            type: 'foreign key',
            name: 'admin_admin_id',
            references: { table: 'admins', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_favorites', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'user_favorites_user_id',
            references: { table: 'users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_favorite_ref_products', {
            fields: ['favorite_id'],
            type: 'foreign key',
            name: 'favorite_favorite_id',
            references: { table: 'user_favorites', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_favorite_ref_products', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'favorite_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_carts', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'user_carts_user_id',
            references: { table: 'users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('users_lk', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'user_lk_user_id',
            references: { table: 'users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_cart_ref_products', {
            fields: ['cart_id'],
            type: 'foreign key',
            name: 'cart_cart_id',
            references: { table: 'user_carts', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_cart_ref_products', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'cart_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_orders', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'user_user_id',
            references: { table: 'users', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_order_ref_products', {
            fields: ['order_id'],
            type: 'foreign key',
            name: 'user_order_order_id',
            references: { table: 'user_orders', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('user_order_ref_products', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'user_order_product_id',
            references: { table: 'products', field: 'id' },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users', { cascade: true});
        await queryInterface.dropTable('products', { cascade: true});
        await queryInterface.dropTable('filters', { cascade: true});
        await queryInterface.dropTable('categories', { cascade: true});
        await queryInterface.dropTable('admins', { cascade: true});
        await queryInterface.dropTable('reviews', { cascade: true});
        await queryInterface.dropTable('user_orders', { cascade: true});
        await queryInterface.dropTable('user_favorites', { cascade: true});
        await queryInterface.dropTable('user_carts', { cascade: true});
        await queryInterface.dropTable('admin_logs', { cascade: true});
        await queryInterface.dropTable('category_ref_filters', { cascade: true});
        await queryInterface.dropTable('user_order_ref_products', { cascade: true});
        await queryInterface.dropTable('user_favorite_ref_products', { cascade: true});
        await queryInterface.dropTable('user_cart_ref_products', { cascade: true});
        await queryInterface.dropTable('products_ref_rel_products', { cascade: true});
        await queryInterface.dropTable('users_lk', { cascade: true});
        await queryInterface.dropTable('template_characteristic', { cascade: true});
        await queryInterface.dropTable('support_orders', { cascade: true});


        // await queryInterface.removeConstraint('category_ref_filters_category_id');
        // await queryInterface.removeConstraint('category_ref_filters_filters');
        // await queryInterface.removeConstraint('products_category_id');
        // await queryInterface.removeConstraint('products_product_id');
        // await queryInterface.removeConstraint('products_rel_product_id');
        // await queryInterface.removeConstraint('reviews_user_id');
        // await queryInterface.removeConstraint('reviews_product_id');
        // await queryInterface.removeConstraint('admin_admin_id');
        // await queryInterface.removeConstraint('user_favorites_user_id');
        // await queryInterface.removeConstraint('favorite_favorite_id');
        // await queryInterface.removeConstraint('user_carts_user_id');
        // await queryInterface.removeConstraint('favorite_product_id');
        // await queryInterface.removeConstraint('cart_cart_id');
        // await queryInterface.removeConstraint('cart_product_id');
        // await queryInterface.removeConstraint('user_user_id');
        // await queryInterface.removeConstraint('user_order_order_id');
        // await queryInterface.removeConstraint('user_order_product_id');
    }
};
