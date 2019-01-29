
const router = require('express').Router();
const Shipment  = require('../models/Shipment');
const guard  = require('../services/guard');

module.exports = router;

// Get a list contains all of the biker's parcels
router.get('/parcels/:bikerid', guard, (req, res, next) => {
    Shipment.parcels(req.params.bikerid).then(
        (parcels) => {
            res.json(Object.assign(req.base, {
                parcels,
                status: 0,
            }));
        },
        (err) => {
           next(new Error("4"));
           return;
        });
});