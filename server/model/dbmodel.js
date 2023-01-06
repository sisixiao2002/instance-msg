//引入mongoose
var mongoose = require('mongoose');
//引入config-db.js
var db = require('../config/db');
var Schema = mongoose.Schema;

//用户表
var UserSchema = new Schema({
    name: { type: String },                         //用户名
    psw: { type: String },                          //密码
    email: { type: String },                        //邮箱
    sex: { type: String, default: 'asexual' },      //性别
    birth: { type: Date },                          //生日
    phone: { type: Number },                        //电话
    explain: { type: String },                      //介绍
    imgurl: { type: String, default: 'user.png' },  //用户头像
    time: { type: Date },                           //注册时间
});

//好友表
var FriendSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },      //用户id
    friendID: { type: Schema.Types.ObjectId, ref: 'User' },    //好友id
    state: { type: String },                                   //好友状态(0已为好友，1申请中，2申请发送方，对方还未同意）
    markname: { type: String },                                //好友昵称
    time: { type: Date },                                      //生成时间
    lastTime: { type: Date },                                  //最后通讯时间(后加入项)
});

//一对一消息表
var FriendMsgSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },      //用户id
    friendID: { type: Schema.Types.ObjectId, ref: 'User' },    //好友id
    message: { type: String },                                 //内容
    types: { type: String },                                   //内容类型(0文字,1图片链接,2音频链接。。)
    state: { type: Number }                                    //消息状态(0已读,1未读)
});

//群表
var GroupSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },      //用户id
    name: { type: String },                                    //群名
    imgurl: { type: String, default: 'group.png' },            //群头像
    time: { type: Date },                                      //创建时间
    notice: { type: String }                                   //公告
});

//群成员表
var GroupUserSchema = new Schema({
    groupID: { type: Schema.Types.ObjectId, ref: 'Group' },    //群id
    userID: { type: Schema.Types.ObjectId, ref: 'User' },      //用户id
    name: { type: String },                                    //用户群内名称
    tip: { type: Number, default: 0 },                         //未读消息数
    time: { type: Date },                                      //用户加入时间
    lastTime: { type: Date },                                  //最后通讯时间(后加入项)
    shield: { type: Number }                                   //是否屏蔽群消息 (0不屏蔽，1屏蔽)
});

//群信息表
var GroupMsgSchema = new Schema({
    groupID: { type: Schema.Types.ObjectId, ref: 'Group' },    //群id
    userID: { type: Schema.Types.ObjectId, ref: 'User' },      //发送消息的用户id
    message: { type: String },                                 //内容
    types: { type: String },                                   //内容类型(0文字,1图片链接,2音频链接。。)
    state: { type: Number }                                    //消息状态(0已读,1未读)
});

module.exports = db.model('User', UserSchema);
module.exports = db.model('Friend', FriendSchema);
module.exports = db.model('Message', FriendMsgSchema);
module.exports = db.model('Group', GroupSchema);
module.exports = db.model('GroupUser', GroupUserSchema);
module.exports = db.model('GroupMsg', GroupMsgSchema);