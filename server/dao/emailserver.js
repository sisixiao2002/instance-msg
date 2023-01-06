//引用发送邮件插件
var nodemailer = require('nodemailer');
//引入证书
var credentials = require('../config/credentials')

//创建传输方式
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: credentials.qq.user,
        pass: credentials.qq.pass,
    }
})

//注册发送邮件给用户
exports.emailSignUp = function (email, res) {
    //发送消息
    let options = {
        from: '2069742807@qq.com',//谁发的
        to: email,//发给谁
        subject: '感谢您在liullian注册',//主题是什么
        html: '<span>liulian欢迎你的加入</span><a href="http://localhost:8080">点击</a>'
    };
    //发送邮件
    transporter.sendMail(options, function (err, msg) {
        if (err) {
            res.send('邮箱发送失败!', err)
            console.log(err);
        } else {
            res.send('邮箱发送成功!')
            console.log('邮箱发送成功!')
        }
    })
}


