//用户登录

var dbserver = require('../dao/dbserver');
//引入token 
var jwt = require('../dao/jwt')

//登录
exports.login = function (req, res) {
    let [data, pwd] = [req.body.data, req.body.pwd]
    dbserver.userMatch(data, pwd, res)
}

//token匹配
exports.test = function (req, res) {
    let token = req.body.token
    let jg = jwt.varifyToken(token)

    res.send(jg)
}