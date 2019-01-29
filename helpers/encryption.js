var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    secret = process.env.SECRET;

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,secret)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,secret)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;