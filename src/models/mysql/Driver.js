const dataTypes = require('../../mysql/connection').DataTypes;
const sequelize = require('../../mysql/connection').sequelize;
const DriverInfo = require('./DriverInfo');
const Bus = require('./Bus');

const Driver = sequelize.define('driver', {
    id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    firebaseRef: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
            return this.getDataValue('firebaseRef');
        },
        set(firebaseRef) {
            return this.setDataValue('firebaseRef', firebaseRef)
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
    },
    refferenceCode: {
        type: dataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('refferenceCode');
        },
        set(code) {
            return this.setDataValue('refferenceCode', code)
        }
    },
    verified: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        get() {
            return this.getDataValue('verified');
        },
        set(verified) {
            return this.setDataValue('verified', verified)
        }
    }
});

Driver.hasOne(DriverInfo);
Driver.hasOne(Bus);

module.exports = Driver;