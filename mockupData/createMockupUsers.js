
var fs = require("fs");
let bcrypt = require('bcrypt');

// An array of promises (To use in the loop)
var promises= [];

function createUser(i){
    return new Promise(function(resolve, reject){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                reject(err);
            }

            let role = i == 0 ? "manager" : "biker",
                rawPassword = i == 0 ? "managerpw" : "biker" + i + "pw";

            bcrypt.hash(rawPassword, salt, function(err, hash) {
                if (err) {
                    reject(err);
                }
                resolve({
                    id: i,
                    username: i == 0 ? role : role +  i,
                    name: i == 0 ? role : role +  i,
                    role: role,
                    password:  hash
                });
            });
        });
   });
}

for (let i=0; i<11; i++){
    promises.push(
        createUser(i)
    );
}

Promise.all(promises)    
 .then(function(data){ 
    fs.writeFile("./users.js", "let users = " + 
                JSON.stringify({users: data}, null, 2) + 
                "; module.exports = users.users;" , (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Your file created");
    });
  })
 .catch(function(err){
    console.log('err: ', err);
  });