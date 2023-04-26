const {Sequelize} = require('sequelize')
const {createNamespace} = require('cls-hooked')

const namespace = createNamespace('ns')
Sequelize.useCLS(namespace)


const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

function openConnection() {
    return db.authenticate();
}

function closeConnection() {
    return db.close();
}


module.exports = {
    db,
    openConnection,
    closeConnection,
};



