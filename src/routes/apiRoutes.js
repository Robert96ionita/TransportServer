const driversRepo = require('../repos/mysql/Drivers');

module.exports = (app) => {
    app.post('/api/submit-info', (req, res) => {
        if (!req.body.name || !req.body.surname || !req.body.CNP) {
            return res.status(401).send("Inssuficient data");
        }
        driverInfo = {
            name: req.body.name,
            surname: req.body.surname,
            CNP: req.body.CNP
        }
        driversRepo.addDriverInfo(req.user.driverId, driverInfo, (err, info) => {
            if (err) {
                return res.status(500).send("Error");
            }
            return res.send(info);
        });
    });

    app.post('/api/add-vehicle', (req, res) => {
        if (!req.body.lineNumber || !req.body.hasAC || !req.body.ocupationLevel) {
            return res.status(401).send("Inssuficient data");
        }
        const bus = {
            lineNumber: req.body.lineNumber,
            hasAC: (req.body.hasAC == 'true'),
            ocupationLevel: req.body.ocupationLevel
        }
        driversRepo.addVehicle(req.user.driverId, bus, (err, info) => {
            if (err) {
                return res.status(500).send("Error");
            }
            return res.send(info);
        });
    });

    app.post('/api/update-vehicle', (req, res) => {
        let updateValues = {};
        if (req.body.lineNumber) {
            updateValues = Object.assign({lineNumber: req.body.lineNumber}, updateValues);
        }
        if (req.body.hasAC) {
            updateValues = Object.assign({hasAC: (req.body.hasAC == 'true')}, updateValues);
        }
        if (req.body.ocupationLevel) {
            updateValues = Object.assign({occupationLevel: req.body.ocupationLevel}, updateValues);
        }
        console.log(updateValues);
        driversRepo.updateVehicle(req.user.driverId, updateValues, (err, info) => {
            if (err) {
                return res.status(500).send("error");
            }
            return res.send(info);
        });
    });

    app.get('/api/verified', (req, res) => {
        driversRepo.getDriverVerificationStatus(req.user.driverId, (err, info) => {
            if (err) {
                return res.status(500).send("Error");
            }
            return res.json(info);
        });
    });

    app.get('/api/full-info', (req, res) => {
        driversRepo.getDriverFullInfo(req.user.driverId, (err, info) => {
            if (err) {
                return res.status(500).send("Error");
            }
            return res.json(info);
        });
    });

    app.get('/bus/:firebaseRef', (req, res) => {
        if (!req.params.firebaseRef) {
            return res.status(400).send("Invalid param");
        }
        driversRepo.getBusByFirebaseRef(req.params.firebaseRef, (err, bus) => {
            if (err) {
                return res.status(404).send("No bus found");
            }
            return res.status(200).json(bus);
        });
    });
}