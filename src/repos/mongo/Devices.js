const mongoose = require('mongoose');
const Device = mongoose.model('device');

const register = (id, location, callback) => {
    let device = new Device({
        id: id, 
        locations:{
            lat: location.latitude.toString(), 
            lon: location.longitude.toString(),
            timestamp: new Date(location.timestamp)
        }
    });

    device.save().then(() => {
        return callback(null, device);
    }).catch((err) => {
        return callback(err);
    });
};

exports.addLocation = (id, location, callback) => {
    console.log(location.timestamp);
    Device.findOne({ 'id': id }, 'locations', (err, device) => {
        if (err) { 
            return callback(err);
        }
        if (device == null) {
            register(id, location, (err, device) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        } else {
            device.locations.push({
                lat: location.latitude.toString(), 
                lon: location.longitude.toString(),
                timestamp: new Date(location.timestamp)
            });        
            device.save((err) => {
                if (err) {
                        return callback(err); 
                }
    
                return callback(null, device);
            });
        }
    });
};