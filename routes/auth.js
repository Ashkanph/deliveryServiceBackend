
const router        = require('express').Router();
const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const encryption    = require('../helpers/encryption');

module.exports = router;

router.post("/login", (req, res, next) => {
    
    if(!req.query.username || !req.query.password){
        //"Username and password are required."
        next(new Error("3"));
        return;
    }
    
    User.findUser({
        username: req.query.username,
        password: req.query.password
    }).then(
        (user) => {
            // user has authenticated correctly thus we create a JWT token and return it
            var token = jwt.sign({
                data: encryption.encrypt(user.id.toString())
            }, process.env.SECRET, { expiresIn: '1h' }); 
            
            res.json(Object.assign(req.base, {
                token,
                name: user.name,
                id: user.id,
                username: user.username,
                role: user.role,
                status: 0,
                message: "Successful login."
            }));
        },
        (err) => {
            // "Username or password is wrong."
            next(new Error("2"));
            return;
        }
    )
});

router.get('/logout', function(req, res){
    req.logout();
    res.json(Object.assign(req.base, {
        status: 0,
        message: "Successful logout."
    }));
  });