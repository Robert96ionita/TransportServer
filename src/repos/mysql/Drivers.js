const Driver = require('../../models/mysql/Driver');
const DriverInfo = require('../../models/mysql/DriverInfo');
const Bus = require('../../models/mysql/Bus');
const bcrypt = require('bcrypt');

const addDriver = async (driver, callback) => {
    const hashedPassword = await bcrypt.hash(driver.password, bcrypt.genSaltSync(8));
    Driver.findOrCreate({ where: { email: driver.email }, defaults: { password: hashedPassword, firebaseRef: driver.firebaseRef } })
        .then(result => {
            return callback(null, result[0]);
        }).catch(err => {
            return callback(err);
        });
};

const getDriverById = (driverId, callback) => {
    Driver.findOne({ where: { id: driverId }, attributes: ['id', 'email', 'password', 'firebaseRef'] }).then(driver => {
        return callback(null, driver);
    }).catch(err => {
        return callback(err);
    });
};

const getDriverByFirebaseRef = (firebaseRef, callback) => {
    Driver.findOne({ where: { firebaseRef: firebaseRef }, attributes: ['id', 'email', 'password', 'firebaseRef'] }).then(driver => {
        return callback(null, driver);
    }).catch(err => {
        return callback(err);
    });
};

const getDriverByEmail = (uEmail, callback) => {
    Driver.findOne({ where: { email: uEmail }, attributes: ['id', 'email', 'password', 'firebaseRef'] }).then(driver => {
        return callback(null, driver);
    }).catch(err => {
        return callback(err);
    });
}

const getDriverInfo = (driverEmail, callback) => {
    Driver.findOne({ where: { email: driverEmail }, attributes: ['driverInfo.name', 'driverInfo.surname', 'email', 'driverInfo.CNP'], include: [DriverInfo] }).then(driver => {
        return callback(null, driver);
    }).catch(err => {
        return callback(err);
    });
}

const addDriverInfo = (driverId, driverInfo, callback) => {
    DriverInfo.findOrCreate({ where: { driverId: driverId }, defaults: { 
        name: driverInfo.name, surname: driverInfo.surname, CNP: driverInfo.CNP 
    } })
    .then(result => {
        return callback(null, result[0]);
    }).catch(err => {
        return callback(err);
    });
}

const addVehicle = (driverId, vehicle, callback) => {
    Bus.findOrCreate({ where: { driverId: driverId }, defaults: {
        lineNumber: vehicle.lineNumber,
        hasAC: vehicle.hasAC,
        occupationLevel: vehicle.ocupationLevel 
    }})
    .then(result => {
        return callback(null, result[0]);
    }).catch(err => {
        return callback(err);
    });
}

const updateVehicle = (driverId, vehicle, callback) => {
    Bus.update(vehicle, {where: {driverId: driverId}}).then(result => {
        return callback(null, result);
    }).catch(err => {
        return callback(err);
    });
}

const getAllUnapprovedDrivers = (callback) => {
    Driver.findAll({
        where: {
          verified: false
        }
      }).then(results => {
          return callback(null, results);
      }).catch(err => {
          return callback(err);
      });
}

const getDriverVerificationStatus = (driverId, callback) => {
    Driver.findOne({ where: { id: driverId }, attributes: ['verified'] }).then(driver => {
        return callback(null, driver);
    }).catch(err => {
        return callback(err);
    });
};

const getDriverFullInfo = (driverId, callback) => {
    Driver.findOne({where: {id: driverId}, attributes: ['email', 'verified'], include: [DriverInfo, Bus]
        }).then(driver => {
            return callback(null, driver);
        }).catch(err => {
            return callback(err);
        })
};

const getBusByFirebaseRef = (firebaseRef, callback) => {
    getDriverByFirebaseRef(firebaseRef, (err, driver) => {
        if (err) {
            return callback(err);
        }
        Driver.findOne({where: {id: driver.id}, attributes: [], include: [Bus]}).then(driver => {
            return callback(null, driver);
        }).catch(err => {
            return callback(err);
        })
    });
};

module.exports = { 
    addDriver, addDriverInfo, getBusByFirebaseRef,
    getDriverById, getDriverByEmail, 
    getDriverVerificationStatus, getDriverInfo,
    addVehicle, updateVehicle, getDriverFullInfo
};