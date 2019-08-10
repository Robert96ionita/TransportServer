const driversRepo = require('../repos/mysql/Drivers');
const adminRepo = require('../repos/mysql/Admins');
const authenticate = require('../security/auth').authenticate;
const adminAuthenticate = require('../security/auth').adminAuthenticate;

module.exports = (app, passport) => {

    app.post('/login', (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send("No credentials provided");
        }
        driversRepo.getDriverByEmail(req.body.email, async (err, driver) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error encountered");
            }
            if (!driver) {
                return res.status(404).send("User not found");
            }
            const token = await authenticate(driver, req.body.password);
            if (!token) {
                return res.status(400).send("Invalid credentials");
            }

            return res.status(201).json(token);
        });
    });

    app.post('/admin-login', (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send("No credentials provided");
        }
        adminRepo.getAdminByEmail(req.body.email, async (err, admin) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error encountered");
            }
            if (!admin) {
                return res.status(404).send("Invalid credentials");
            }
            const token = await adminAuthenticate(admin, req.body.password);
            if (!token) {
                return res.status(400).send("Invalid credentials");
            }

            return res.status(201).json(token);
        });
    });

    app.post('/register', (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send("No credentials provided");
        }
        newDriver = {
            email: req.body.email,
            password: req.body.password,
            firebaseRef: req.body.firebaseRef
        }
        driversRepo.addDriver(newDriver, async (err, driver) => {
            if (err) {
                return res.status(500).send("Could not create user");
            }

            const token = await authenticate(driver, req.body.password);
            if (!token) {
                return res.status(400).send("Invalid credentials");
            }

            return res.status(201).json(token);
        });
    });

    app.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
        res.status(200).send("Authenticated");
    });

    app.all('/api/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {
        next();
    });

    app.all('/admin/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {
        if (req.user.role != 'admin') {
            res.status(403).send("Unauthorized!");
        } else {
            next();
        }
    });
}