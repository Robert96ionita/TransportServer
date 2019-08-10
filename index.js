const express = require('express');
const http = require('http');
const webToken = require('jsonwebtoken');
const socketIo = require('socket.io');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('./src/security/passport');

const app = express();
app.disable('x-powered-by')
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

const server = http.Server(app);
server.listen(5000);

require('./src/mysql/connection');
require('./src/mongo/connection')();
require('./src/models/mongo/Device');

require('./src/routes/authRoutes')(app, passport);
require('./src/routes/administrationRoutes')(app);
require('./src/routes/apiRoutes')(app);

const io = socketIo(server);
require('./src/websockets/index')(io);

app.get('/', (req, res) => {
    res.json("Api version " + process.env.npm_package_version);
});