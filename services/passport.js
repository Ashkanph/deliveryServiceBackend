let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../models/User');
let encryption         = require('../helpers/encryption');

module.exports = function(passport) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.SECRET
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(encryption.decrypt(jwt_payload.data)
            , (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
    }));
};