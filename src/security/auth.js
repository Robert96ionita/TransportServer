const Driver = require('../models/mysql/Driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenExpirationTime = '3d';

const authenticate = async (driver, providedPassword) => {
    const validPassword = await bcrypt.compare(providedPassword, driver.password);
    if (validPassword) {
        return jwt.sign({
            driverId: driver.id,
            email: driver.email,
            firebaseRef: driver.firebaseRef
        }, process.env.SECRET_OR_KEY, { expiresIn: tokenExpirationTime })
    }

    return null;
}

const adminAuthenticate = async (admin, providedPassword) => {
    const validPassword = await bcrypt.compare(providedPassword, admin.password);
    if (validPassword) {
        return jwt.sign({
            id: admin.id,
            email: admin.email,
            role: 'admin'
        }, process.env.SECRET_OR_KEY, { expiresIn: tokenExpirationTime })
    }

    return null;
}

module.exports = { authenticate, adminAuthenticate };