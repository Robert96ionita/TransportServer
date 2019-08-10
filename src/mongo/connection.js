const mongoose = require('mongoose');
const config = require('../../config/secretKeys');

module.exports = () => {
    let uri = config.databases.mongo.uri;

    mongoose.connect(uri)
    .then(() => {
        console.log("Connected to mongo");
    }).catch((err) => {
        console.log("Mongo connection failed" + err);
    });
} 