/* jsonwebtoken登录验证 */
//引入token 
var jwt = require('jsonwebtoken');
var secret = 'xiaokeyun';

//生成token 
exports.genderateToken = function (e) {
    let payload = { id: e, time: new Date() }
    let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 })

    return token
}

//解码token
exports.varifyToken = function (e) {
    let payload;
    jwt.verify(e, secret, function (err, result) {
        if (err) {
            payload = 0;
        } else {
            payload = 1;
        }
    });

    return payload
}