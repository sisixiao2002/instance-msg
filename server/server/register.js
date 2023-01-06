//注册页面

var dbserver = require('../dao/dbserver');

//用户注册
exports.register = function (req, res) {
    let [name, mail, pwd] = [req.body.name, req.body.mail, req.body.pwd]
    dbserver.buildUser(name, mail, pwd, res)
}

//用户或邮箱是否占用判断
exports.judgeValue = function (req, res) {
    let [data, type] = [req.body.data, req.body.type]
    dbserver.countUserValue(data, type, res)
}