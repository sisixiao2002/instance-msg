//引入解析req.body插件
var bodyParser = require('body-parser');
// 导入 express 模块
const express = require('express')
// 创建 express 服务器实例
const app = express()
// 设置端口号为3000
const port = 3000
//引入token 
var jwt = require('./dao/jwt')

//设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    //这段仅仅未来方便返回json而已
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }

});

//解析前端数据
app.use(bodyParser.json());
//token判断
app.use(function (req, res, next) {
    if (typeof (req.body.token) != 'undefined') {
        //处理token匹配
        let token = req.body.token
        let tokenMatch = jwt.varifyToken(token);
        if (tokenMatch == 1) {
            //通过验证
            next();
        } else {
            //验证不通过
            res.send({ status: 300 })
        }
    } else {
        next();
    }
})


require('./router/index')(app);


//引用模块
require('./router/index')(app);

//可以使用app.use()连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

//404页面
app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404;
    //next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由
    //为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
    next(err);
})

//出现错误处理
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send(err.message);
})

//调用 app.listen方法，指定端口号启动服务器
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})