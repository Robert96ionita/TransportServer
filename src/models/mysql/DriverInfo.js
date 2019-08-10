const dataTypes = require('../../mysql/connection').DataTypes;
const sequelize = require('../../mysql/connection').sequelize;

const DriverInfo = sequelize.define('driverInfo', {
    id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    name: {
        type: dataTypes.STRING,
        get() {
            return this.getDataValue('name');
        },
        set(name) {
            return this.setDataValue('name', name)
        }
    },
    surname: {
        type: dataTypes.STRING,
        get() {
            return this.getDataValue('surname');
        },
        set(surname) {
            return this.setDataValue('surname', surname)
        }
    },
    CNP: {
        type: dataTypes.STRING,
        get() {
            return this.getDataValue('CNP');
        },
        set(CNP) {
            return this.setDataValue('CNP', CNP)
        }
    }
});

module.exports = DriverInfo;