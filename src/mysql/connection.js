const Sequelize = require('sequelize');
const config = require('../../config/secretKeys').databases.mysql;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: 'mysql'});
sequelize.authenticate().then(() => {
    console.log("Database connection successful!");
    sequelize.sync().catch(err => {
        console.log(err.message);
    });
}).catch((err) => {
    console.log("MySQL - connecting to the database failed! " + err.message);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = Sequelize.DataTypes;

module.exports = db;