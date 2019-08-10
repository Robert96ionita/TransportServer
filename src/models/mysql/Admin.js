const dataTypes = require('../../mysql/connection').DataTypes;
const sequelize = require('../../mysql/connection').sequelize;

const Admin = sequelize.define('admin', {
    id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
            return this.getDataValue('email');
        },
        set(email) {
            return this.setDataValue('email', email)
        }
    },
    password: {
        type: dataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('password');
        },
        set(pass) {
            return this.setDataValue('password', pass)
        }
    }},
    {
        timestamps: false
    });

module.exports = Admin;