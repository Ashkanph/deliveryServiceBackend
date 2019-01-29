
const router        = require('express').Router();
const guard         = require('../services/guard');
const User          = require('../models/User');

module.exports = router;

router.get("/bikers", guard, function(req, res, next) {
    User.bikers().then(
        (bikers) => {
            res.json(Object.assign(req.base, {
                bikers,
                status: 0,
            }));
        },
        (err) => {
           next(new Error("4"));
           return;
        });
});