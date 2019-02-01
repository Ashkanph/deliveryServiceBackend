let bcrypt = require('bcrypt');
const users = require('../mockupData/users');

function comparePassword(receivedPassword, pw, cb) {
    bcrypt.compare(receivedPassword, pw, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });
};

function findUser(user) {

    return new Promise(function(resolve, reject) {
        let userIndex = users.findIndex((item)=> item.username === user.username);
        
        if(userIndex > -1)
            comparePassword(user.password, users[userIndex].password, 
                    (err, isMatch) => {
                        if(err){ // username was not right
                            reject("No user.");
                            return;
                        }else if(isMatch){ // password was correct
                            resolve(users[userIndex]);
                            return;
                        }else{ 
                            // Password was wrong
                            reject("No user.");
                            return;
                        }
                    });
        else
            reject("No user!");
      });
}

function findById(id, cb) {
    let userIndex = users.findIndex((item)=> item.id === Number(id));
    
    if(userIndex > -1)
        cb(null, users[userIndex])
    else
        cb("No user.")
}

function bikers() {
    return new Promise(function(resolve, reject) {
        let newUsers = users.map(function(item){
            return {
                id: item.id,
                name: item.name
            };
        });
        if(users != null)
          resolve(newUsers.slice(1));
        else
          reject("err");
    });
}

module.exports = {findUser, findById, bikers};