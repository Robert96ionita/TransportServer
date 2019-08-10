const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    lat: {type: String, required: true},
    lon: {type: String, required: true},
    timestamp: {type: Date, required: true}
});

const deviceSchema = new Schema({
    id: { type: String, required: true, index: { unique: true } },
    locations: [locationSchema]
});

mongoose.model('device', deviceSchema);