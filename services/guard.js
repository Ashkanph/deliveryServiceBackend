
const passport  = require('passport');
const errStatus = require('./errStatus');

module.exports = (req, res, next) => {
    if (process.env.GUARD == "false") {
        next();
        return;
    }

    console.log(req.originalUrl)
    
    passport.authenticate('jwt', function(err, user, info) {        
        if (err) {
            console.log('error: 0', err);
            
            next(new Error("1"));
            return;
        }
        
        if (!user) {
            next(new Error("1"));
            return;
        }
        next();
    })(req, res, next);
}