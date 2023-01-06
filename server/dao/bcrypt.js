//引入bcrypt
var bcrypt = require('bcryptjs');

//生成hash密码
exports.encryption = function (e) {
    //生成随机数salt
    let salt = bcrypt.genSaltSync(10);

    //生成hash密码
    var hash = bcrypt.hashSync(e, salt);

    return hash;
}

//解密
exports.verification = function (e, hash) {
    let verif = bcrypt.compareSync(e, hash);

    return verif;
}