const dataTypes = require('../../mysql/connection').DataTypes;
const sequelize = require('../../mysql/connection').sequelize;

const Bus = sequelize.define('bus', {
    id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    lineNumber: {
        type: dataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('lineNumber');
        },
        set(lineNumber) {
            return this.setDataValue('lineNumber', lineNumber)
        }
    },
    hasAC: {
        type: dataTypes.BOOLEAN,
        defaultValue: false,
        get() {
            return this.getDataValue('hasAC');
        },
        set(hasAC) {
            return this.setDataValue('hasAC', hasAC)
        }
    },
    occupationLevel: {
        type: dataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('occupationLevel');
        },
        set(occupationLevel) {
            return this.setDataValue('occupationLevel', occupationLevel)
        }
    }
});

module.exports = Bus;