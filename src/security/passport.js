const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

const opt = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const emailAndPasswordStrategy = new jwtStrategy(opt, (payload, next) => {
    next(null, payload);
});
passport.use(emailAndPasswordStrategy);

module.exports = passport;