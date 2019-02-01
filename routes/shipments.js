
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
        Shipment.changeAssigneeID(req.params.id, req.query.newAssigneeID).then(
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
    
    if(req.query.newpickup){
        Shipment.changePickupTime(req.params.id, req.query.newpickup).then(
            (result) => {
                res.json(Object.assign(req.base, {
                    status: 0,
                }));
            },
            (err) => {
               next(new Error("6"));
               return;
            });
    }
    
    if(req.query.newdelivery){
        Shipment.changeDeliveryTime(req.params.id, req.query.newdelivery).then(
            (result) => {
                res.json(Object.assign(req.base, {
                    status: 0,
                }));
            },
            (err) => {
               next(new Error("7"));
               return;
            });
    }
});