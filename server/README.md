## 记录知识点
### 1.express
// 导入 express 模块
const express = require('express')
// 创建 express 服务器实例
const app = express()
// 设置端口号为3000
const port = 3000

//通过app.get()方法，可以监听客户端的GET请求
// 参数1: 客户端请求的 URL 地址
// 参数2: 请求对应的处理函数
//      req: 请求对象(包含了与请求相关的属性与方法)
//      res: 响应对象(包含了与响应相关的属性与方法)
//app.get("请求URL'，function(req，res){ /*处理函数*/ })

app.get('/', (req, res) => {
    res.send('你好!')
    //通过res.send()方法，可以把处理好的内容，发送给客户端
})

//客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。
//多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，
//中间组件作用：统一为req或 res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。
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

### 2.暴露/引用模块
ES6 规范：export default 和 import 配对
CommonJS 规范：module.exports 和 require 配对


### 3.node分层
一.nodeJS分层

分为三层：

- 表现层：接受用户数据，并封装
- 服务层：与公司业务有关的东西，处理判断呀什么的
- 持久层：与数据库有关的

  
表现层：page与表现层的数据传递，routes接受前台数据   

注意：表现层不会直接访问持久层，持久层也不会直接返回数据给表现层

二.具体步骤

1. 引入数据库：在myapp下创建持久层文件夹dao：

     dao下面创建：
          model/modelUsers.js:用于连接数据库、定义schema结构、创建schema模型
          database.js：用于连接mongo
          userDao.js:用于书写持久层的代码

2. 在app.js中通过require()引入    
   
      //与mongo建立连接
      require("./dao/database.js");
      require("./dao/model/modelUser.js");     

3.创建服务层文件：在myapp下创建service文件，在service中新建userService.js:用于书写服务层内容。

4.各层之间的数据连接：

    在表现层引用服务层，并调用服务层的方法，接受服务层返回的数据
    在服务层引用持久层，并调用持久层的方法，接受持久层返回的数据
    持久层操作数据库和返回结果。

### node模块化
 编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块，
 提高了代码的复用性，可维护性，可以实现按需加载

### 接口文档
 一、什么是接口文档？

在项目开发中，web项目的前后端分离开发，APP开发，需要由前后端工程师共同定义接口，编写接口文档，之后大家都根据这个接口文档进行开发，到项目结束前都要一直维护。

二、为什么要写接口文档？
1、项目开发过程中前后端工程师有一个统一的文件进行沟通交流开发
2、项目维护中或者项目人员更迭，方便后期人员查看、维护

三、接口规范是什么？
首先接口分为四部分：方法、uri、请求参数、返回参数
1、方法:新增(post) 修改(put) 删除(delete) 获取(get)
2、uri：以/a开头，如果需要登录才能调用的接口(如新增、修改；前台的用户个人信息，资金信息等)后面需要加/u，即：/a/u；中间一般放表名或者能表达这个接口的单词；get方法，如果是后台通过搜索查询列表，那么以/search结尾，如果是前台的查询列表，以/list结尾；url参数就不说了。
3、请求参数和返回参数，都分为5列：字段、说明、类型、备注、是否必填
字段是类的属性；说明是中文释义；类型是属性类型，只有String、Number、Object、Array四种类型；备注是一些解释，或者可以写一下例子，比如负责json结构的情况，最好写上例子，好让前端能更好理解；是否必填是字段的是否必填。
4、返回参数结构有几种情况：1、如果只返回接口调用成功还是失败（如新增、删除、修改等），则只有一个结构体：code和message两个参数；2、如果要返回某些参数，则有两个结构体：1是code/mesage/data，2是data里写返回的参数,data是object类型；3、如果要返回列表，那么有三个结构体，1是code/mesage/data,data是object，里面放置page/size/total/totalPage/list 5个参数，其中list是Arrary类型，list里放object，object里是具体的参数。

注意：uri地址里不允许出现大写字母，如果是两个单词拼接，用/分开


### app.post()函数将HTTP POST请求通过指定的回调函数路由到指定的路径。

