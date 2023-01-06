//dbserver用于数据库增删改查
//引入加密文件
var bcrypt = require('../dao/bcrypt')
//引入model-dbmodel.js
var dbmodel = require('../model/dbmodel')
//引入User表
var User = dbmodel.model('User')
//引入Friend表
var Friend = dbmodel.model('Friend')
//引入Group表
var Group = dbmodel.model('Group')
//引入GroupUser表
var GroupUser = dbmodel.model('GroupUser')
//引入Msg表
var Message = dbmodel.model('Message')

//引入token 
var jwt = require('../dao/jwt')

//1.注册页面

//注册页面--新建用户
exports.buildUser = function (name, mail, pwd, res) {
    //密码加密
    let password = bcrypt.encryption(pwd)
    //新建用户的数据
    let data = {
        name: name,
        email: mail,
        psw: password,
        time: new Date(),
    }

    //插入表
    let user = new User(data)

    user.save(function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200 })
        }
    })
}

//注册页面--用户匹配--查找表中元素个数
exports.countUserValue = function (data, type, res) {
    let wherestr = {}
    //相当于wherestr = {'type':data}
    wherestr[type] = data
    //countDocuments是mongoose查找表中个数封装的方法
    User.countDocuments(wherestr, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200, result })
        }
    })
}

//2.登录页面
//登录页面--用户验证
exports.userMatch = function (data, pwd, res) {
    //data可能有两种形式name或者是email
    let wherestr = { $or: [{ 'name': data }, { 'email': data }] };
    let out = { 'name': 1, 'imgurl': 1, 'psw': 1 }

    //查找用户表里面是否有该用户
    User.find(wherestr, out, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            if (result == '') {
                res.send({ status: 400 })
            }
            result.map(function (e) {
                const pwdMatch = bcrypt.verification(pwd, e.psw)
                if (pwdMatch) {
                    let token = jwt.genderateToken(e._id)
                    let back = {
                        id: e._id,
                        name: e.name,
                        imgurl: e.imgurl,
                        token: token
                    }
                    res.send({ status: 200, back })
                } else {
                    res.send({ status: 400 })
                }
            })
        }

    })
}
//3.搜索页面

//搜索页面---搜索用户
exports.searchUser = function (data, res) {
    let wherestr;
    //彩蛋收索框输入liulian返回全部人列表
    if (data == 'liulian ') {
        wherestr = {};
    } else {
        //$regex模糊匹配
        wherestr = { $or: [{ 'name': { $regex: data } }, { 'email': { $regex: data } }] };
    }
    let out = {
        'name': 1,
        'email': 1,
        'imgurl': 1,
    }
    User.find(wherestr, out, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200, result })
        }
    })
}

//搜索页面---判断是否为好友
exports.isFriend = function (uid, fid, res) {
    let wherestr = { 'userID': uid, 'friendID': fid, 'state': 0 }
    Friend.findOne(wherestr, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            if (result) {
                //是好友
                res.send({ status: 200 })
            } else {
                //不是好友
                res.send({ status: 400 })
            }
        }

    })
}

//搜索页面---搜索群
exports.searchGroup = function (data, res) {
    //彩蛋收索框输入liulian返回全部人列表
    let wherestr;
    if (data == 'liulian ') {
        wherestr = {};
    } else {
        //$regex模糊匹配
        wherestr = { 'name': { $regex: data } };
    }
    let out = {
        'name': 1,
        'imgurl': 1,
    }
    Group.find(wherestr, out, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200, result })
        }
    })
}

//搜索页面---判断是否已加入群内
exports.isInGroup = function (uid, gid, res) {
    let wherestr = { 'userID': uid, 'groupID': gid }
    GroupUser.findOne(wherestr, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            if (result) {
                //在群内
                res.send({ status: 200 })
            } else {
                //不在群内
                res.send({ status: 400 })
            }
        }

    })
}

//4.用户详情

//用户详情---详情
exports.userDetial = function (id, res) {
    let wherestr = { '_id': id }
    let out = { 'psw': 0 }//不选是查询所有，选指定可以用{xx: 1}控制，随便命的字符串
    User.findOne(wherestr, out, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200, result })
        }
    })
}

//用户详情---用户信息修改
//更新数据方法
function update(data, update, res) {
    User.findByIdAndUpdate(data, update, function (err, resu) {
        if (err) {
            //修改失败
            res.send({ status: 500 })
        } else {
            //修改成功
            res.send({ status: 200 })
        }
    })
}
exports.userUpdate = function (data, res) {
    let updatestr = {}
    //判断传入数据是否有密码
    if (typeof (data.pwd) != 'undefined') {
        //有密码，进行身份验证（更改密码/邮箱都需要）
        User.find({ '_id': data.id }, { 'psw': 1 }, function (err, result) {
            if (err) {
                res.send({ status: 500 })
            } else {
                if (result == '') {
                    res.send({ status: 400 })
                }
                result.map(function (e) {
                    const pwdMatch = bcrypt.verification(data.pwd, e.psw)
                    if (pwdMatch) {
                        //密码验证成功
                        //如果修改密码传回数据库需要加密
                        if (data.type == 'psw') {
                            //密码加密
                            let password = bcrypt.encryption(data.data)
                            updatestr[data.type] = password;
                            update(data.id, updatestr, res)
                        } else {
                            updatestr[data.type] = data.data;
                            //邮箱匹配 
                            User.countDocuments(updatestr, function (err, result) {
                                if (err) {
                                    res.send({ status: 500 })
                                } else {
                                    if (result == 0) {
                                        //没有匹配项，可以修改
                                        update(data.id, updatestr, res)
                                    } else {
                                        //邮箱已存在
                                        res.send({ status: 300 })
                                    }
                                }
                            })
                        }

                    }
                    else {
                        //密码匹配失败
                        res.send({ status: 400 })
                    }
                })
            }
        })
    } else if (data.type == 'name') {
        //如果类型是name用户名，匹配数据库name是否已存在 
        console.log(data.type)
        updatestr[data.type] = data.data;
        User.countDocuments(updatestr, function (err, result) {
            if (err) {
                res.send({ status: 500 })
            } else {
                if (result == 0) {
                    //没有匹配项，可以修改
                    update(data.id, updatestr, res)
                } else {
                    //用户名已存在
                    res.send({ status: 300 })
                }
            }
        })
    }
    else {
        //一般项修改
        updatestr[data.type] = data.data;
        update(data.id, updatestr, res)

    }
}

//用户详情---获取好友昵称
exports.getMarkName = function (data, res) {
    let wherestr = { 'userID': data.uid, 'friendId': data.fid }
    let out = { 'markname': 1 }
    Friend.findOne(wherestr, out, function (err, result) {
        if (err) {
            //获取失败
            res.send({ status: 500 })
        } else {
            //获取成功
            res.send({ status: 200, result })
        }
    })
}

//用户详情---修改好友昵称
exports.updateMarkName = function (data, res) {
    let wherestr = { 'userID': data.uid, 'friendId': data.fid }
    let updatestr = { 'markname': data.name }
    Friend.updateOne(wherestr, updatestr, function (err, result) {
        if (err) {
            //修改失败
            res.send({ status: 500 })
        } else {
            //修改成功
            res.send({ status: 200 })
        }
    })
}

//5.好友操作

//好友操作--添加好友表方法
exports.bulidFriend = function (uid, fid, state, res) {
    //申请好友的时候，是两两相互的关系，你是我的好友同时我也是你的好友，生成两条数据
    //新建好友的数据
    let data = {
        userID: uid,
        friendID: fid,
        state: state,       //好友状态(0已为好友，1申请中，2申请发送方，对方还未同意）
        time: new Date(),
        lastime: new Date(),
    }
    //插入表
    let friend = new Friend(data)

    friend.save(function (err, result) {
        if (err) {
            console.log('添加好友表出错')
        } else {
            //res.send({ status: 200 })
        }
    })
}
//好友操作---好友最后通讯时间方法
exports.updateFriendLastTime = function (data) {
    let wherestr = { $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] }
    let updatetsr = { 'lastTime': new Date() }

    Friend.updateMany(wherestr, updatetsr, function (err, result) {
        if (err) {
            console.log('添加最后通讯时间出错')
        } else {
            //res.send({ status: 200 })
        }
    })
}
//好友操作---添加一对一消息方法
exports.insertMsg = function (uid, fid, msg, type, res) {
    let data = {
        userID: uid,        //用户id
        friendID: fid,      //好友id
        message: msg,       //内容
        types: type,        //内容类型(0文字,1图片链接,2音频链接。。)
        state: 1,           //消息状态(0已读,1未读)
        time: new Date(),   //发送时间
    }
    //插入表
    let messag = new Message(data)

    messag.save(function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200 })
        }
    })
}
//好友申请
//初次申请，添加两条buildFriend
//非初次申请,不添加buildFriend,只好友申请的信息插入我们一对一消息列表里面去，修改lasttime为最后一次请求好友时间
exports.applyFriend = function (data, res) {
    //判断是否已经申请过
    let wherestr = { 'userID': data.uid, 'friendID': data.fid }
    Friend.countDocuments(wherestr, (err, result) => {
        if (err) {
            res.send({ status: 500 })
        } else {
            if (result == 0) {
                //如果result = 0 为初次申请
                //新建好友插入两条数据，你是我的好友，我也是你的好友
                this.bulidFriend(data.uid, data.fid, 2)
                this.bulidFriend(data.fid, data.uid, 1)
            } else {
                //已申请过好友
                //修改最后一次请求好友时间
                this.updateFriendLastTime(data)
            }
            //添加消息
            this.insertMsg(data.uid, data.fid, data.msg, 0, res)//0是默认消息是文字
        }
    })
}

//好友通过，更新好友state状态(0已为好友，1申请中，2申请发送方，对方还未同意）
exports.updateFriendState = function (data, res) {
    let wherestr = { $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] }
    Friend.updateMany(wherestr, { 'state': 0 }, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200 })
        }
    })
}

//拒绝好友或者删除好友
exports.deleteFriend = function (data, res) {
    let wherestr = { $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] }
    Friend.deleteMany(wherestr, function (err, result) {
        if (err) {
            res.send({ status: 500 })
        } else {
            res.send({ status: 200 })
        }
    })
}















