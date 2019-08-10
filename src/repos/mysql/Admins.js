const Admin = require('../../models/mysql/Admin');
const bcrypt = require('bcrypt');

const getAdminByEmail = (uEmail, callback) => {
    Admin.findOne({ where: { email: uEmail }, attributes: ['id', 'email', 'password'] }).then(admin => {
        return callback(null, admin);
    }).catch(err => {
        return callback(err);
    });
}

module.exports = { getAdminByEmail };