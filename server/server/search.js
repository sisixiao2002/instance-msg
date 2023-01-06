//搜索页面

var dbserver = require('../dao/dbserver');

//搜索用户
exports.searchUser = function (req, res) {
    let data = req.body.data
    dbserver.searchUser(data, res)
}

//判断是否为好友
exports.isFriend = function (req, res) {
    let [uid, fid] = [req.body.uid, req.body.uid]
    dbserver.isFriend(uid, fid, res)
}

//搜索群
exports.searchGroup = function (req, res) {
    let data = req.body.data
    dbserver.searchGroup(data, res)
}

//判断是否已加入群内
exports.isInGroup = function (req, res) {
    let [uid, gid] = [req.body.uid, req.body.gid]
    dbserver.isInGroup(uid, gid, res)
}
