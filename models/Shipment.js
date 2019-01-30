
var allShipments = require('../mockupData/shipments');
var users        = require('../mockupData/users');

function shipments() {
    return new Promise(function(resolve, reject) {
          if(allShipments != null){
            resolve(allShipments);
          }
          else
            reject("err");
      });
}

function parcels(bikerID) {
  return new Promise(function(resolve, reject) {
      let bikerIndex = users.findIndex( (item)=>item.id === Number(bikerID) && 
                                                item.role === "biker" ); 
      if(bikerIndex > -1){
        let parcels = allShipments.filter((item)=>item.assigneeID === Number(bikerID));
        resolve(parcels);
      }else
        reject("err");
  });
}

function changeAssigneeID(shipmentID, newAssigneeID) {
    return new Promise(function(resolve, reject) {
      let index = allShipments.findIndex((item)=> item.id === Number(shipmentID));
        
      if(index > -1){
        allShipments[index].assigneeID = Number(newAssigneeID);
        if(allShipments[index].status === "WAITING"){
          allShipments[index].status = "ASSIGNED";
        }
        resolve("success");
      }else{
        reject("err");
      }
    });
}

function changePickupTime(shipmentID, newPickup) {
    return new Promise(function(resolve, reject) {
      let index = allShipments.findIndex((item)=> item.id === Number(shipmentID));
        
      if(index > -1){
        allShipments[index].pickup = Number(newPickup);
        if(allShipments[index].status === "ASSIGNED"){
          allShipments[index].status = "PICKED_UP";
        }
        resolve("success");
      }else{
        reject("err");
      }
    });
}

function changeDeliveryTime(shipmentID, newDelivery) {
    return new Promise(function(resolve, reject) {
      let index = allShipments.findIndex((item)=> item.id === Number(shipmentID));
        
      if(index > -1){
        allShipments[index].delivery = Number(newDelivery);
        if(allShipments[index].status === "PICKED_UP"){
          allShipments[index].status = "DELIVERED";
        }
        resolve("success");
      }else{
        reject("err");
      }
    });
}

module.exports = { shipments, changeAssigneeID, 
                   parcels, changeDeliveryTime, changePickupTime};