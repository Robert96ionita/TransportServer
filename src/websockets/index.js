const Devices = require('../repos/mongo/Devices');
const jwt = require('jsonwebtoken');
const actions = require('./actions');
const keys = require('../../config/secretKeys');
const shouldUpdateLocation = require('../utils/locationPrecision');

const BUS_ROOM = 'buses';
const CLIENTS_ROOM = 'clients';

module.exports = (io) => {
    console.log("importing sockets");

    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, keys.jwt.secret, (err, decoded) => {
                if (err) {
                    return next(new Error("Auth failed"));
                }
                socket.decoded = decoded;
                return next();
            });
        }
    });

    io.on(actions.CONNECTION, (socket) => {
        let lastLocation = null;

        socket.on(actions.SELECT_ROOM, (room) => {
            console.log(room);
            socket.join(room);
        });

        socket.on(actions.ADD_LOCATION, (loc) => {
            const location = JSON.parse(loc);

            if (shouldUpdateLocation(lastLocation, location)) {
                Devices.addLocation(socket.decoded.driverId, location, (err, device) => {
                    if (err) {
                        return;
                    }
                });
            }
            lastLocation = location;
        });

        socket.on(actions.DISCONNECT, () => {
            console.log('A user disconnected ' + socket.decoded.email);
        });
    });
};