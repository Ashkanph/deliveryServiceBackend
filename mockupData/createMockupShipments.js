
var fs = require("fs");
var shipments = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min; 
}

for (let i=1; i<51; i++){
    let o = {};
    o.id = i;
    o.origin = "point" + getRandomInt(1, 11);
    o.destination = "point" + getRandomInt(1, 11);
    
    o.status = getRandomInt(1, 5);
    switch (o.status) {
        case 1:
            o.status = "WAITING";
            o.pickup    = null;
            o.delivery  = null;
            break;
        case 2:
            o.status = "ASSIGNED";
            o.pickup    = null;
            o.delivery  = null;
            o.assigneeID =  getRandomInt(1, 11);
            break;
        case 3:
            o.status = "PICKED_UP";
            o.pickup = getRandomInt(1516233600000, 1529280000000);
            o.delivery = null;
            //new Date("2018-01-18").getTime() = 1516233600000
            //new Date("2018-06-18").getTime() = 1529280000000
            o.assigneeID =  getRandomInt(1, 11);
            break;
        case 4:
            o.status = "DELIVERED";
            o.pickup = getRandomInt(1516233600000, 1529280000000);
            o.delivery = getRandomInt(1529280000000, 1545091200000) 
            //new Date("2018-01-18").getTime() = 1516233600000
            //new Date("2018-06-18").getTime() = 1529280000000
            //new Date("2018-06-18").getTime() = 1529280000000
            //new Date("2018-12-18").getTime() = 1545091200000
            o.assigneeID =  getRandomInt(1, 11);
            break;
        default:
            console.log('default status! why?');
            break;
    }

    shipments.push(o);
}

fs.writeFile("./shipments.js", "let shipments = " + 
                JSON.stringify({shipments: shipments}, null, 2) + 
                "; module.exports = shipments.shipments;" , (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("Your file created");
});