
const router = require('express').Router();
const Shipment  = require('../models/Shipment');
const guard  = require('../services/guard');

module.exports = router;

// Get list of all shipments
router.get('/shipments', guard, (req, res, next) => {
    Shipment.shipments().then(
        (shipments) => {
            res.json(Object.assign(req.base, {
                shipments,
                status: 0,
            }));
        },
        (err) => {
           next(new Error("4"));
           return;
        });
});

// Change a shipment
router.post('/shipments/:id', guard, (req, res, next) => {
    
    if(req.query.newAssigneeID){
        Shipment.changeAssignee(req.params.id, req.query.newAssigneeID).then(
            (result) => {
                res.json(Object.assign(req.base, {
                    status: 0,
                }));
            },
            (err) => {
               next(new Error("5"));
               return;
            });
    }
});