const driversRepo = require('../repos/mysql/Drivers');

module.exports = (app) => {
    app.get('/admin/test', (req, res) => {
        res.send(req.user);
    });

    app.get('/admin/:driverEmail/info', (req, res) => {
        driversRepo.getDriverInfo(req.params.driverEmail, (err, info) => {
            if (err) {
                return res.status(500).send("Error");
            }
            return res.json(info);
        });
    });
}