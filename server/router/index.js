var dbserver = require('../dao/dbserver')
//引入邮箱发送方法
var emailserver = require('../dao/emailserver')
//注册服务页面
var register = require('../server/register')
//登录服务页面
var login = require('../server/login')
//搜索服务页面
var search = require('../server/search')
//用户详情服务页面
var user = require('../server/userdetail')
//好友服务页面
var friend = require('../server/friend')

module.exports = function (app) {
    app.get('/test', (req, res) => {
        //res.send('aaatest')
        dbserver.findUser(res);
    });
    //邮箱测试
    app.post('/mail', (req, res) => {
        //前端传递过来的信息
        let mail = req.body.mail;
        emailserver.emailSignUp(mail, res)
        //res.send(mail)
        //console.log(mail);
    })

    //注册页面
    //注册
    app.post('/register/add', (req, res) => {
        register.register(req, res)
    })

    //用户或邮箱是否占用判断
    app.post('/register/judge', (req, res) => {
        register.judgeValue(req, res)
    })

    //登录页面
    //登录
    app.post('/login/match', (req, res) => {
        login.login(req, res)
    })


    //搜索页面
    //搜索用户
    app.post('/search/user', (req, res) => {
        search.searchUser(req, res)
    })
    //是否为好友
    app.post('/search/isfriend', (req, res) => {
        search.isFriend(req, res)
    })
    //搜索群
    app.post('/search/group', (req, res) => {
        search.searchGroup(req, res)
    })
    //是否已加入群内
    app.post('/search/isingroup', (req, res) => {
        search.isInGroup(req, res)
    })

    //用户详情页面
    //详情
    app.post('/user/detail', (req, res) => {
        user.userDetial(req, res)
    })
    //用户信息修改
    app.post('/user/update', (req, res) => {
        user.userUpdate(req, res)
    })
    //获取好友昵称
    app.post('/user/getmarkname', (req, res) => {
        user.getMarkName(req, res)
    })
    //修改好友昵称
    app.post('/user/updatemarkname', (req, res) => {
        user.updateMarkName(req, res)
    })

    //好友操作
    //申请好友
    app.post('/friend/applyfriend', (req, res) => {
        friend.applyFriend(req, res)
    })
    //好友通过，更新好友state状态
    app.post('/friend/updatefriendstate', (req, res) => {
        friend.updateFriendState(req, res)
    })
    //拒绝好友或者删除好友
    app.post('/friend/deletefriend', (req, res) => {
        friend.deleteFriend(req, res)
    })


    //token测试
    // app.post('/login/test', (req, res) => {
    //     //login.test(req, res)
    //     res.send('这里token正确')
    // })
}