/* 链接数据库的js  */

//引入mongoose
var mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/instantMsg', { useNewUrlParser: true, useUnifiedTopology: true })

//连接状态，失败/成功
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.info('数据库 instantMsg 打开成功!')
});

//暴露
module.exports = db;