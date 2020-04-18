const { connect, connection } = require('mongoose');
const { dbInfo } = require('../config');
exports.UserModel = require('./userModel');
exports.ArticleModel = require('./articleModel');
exports.CategoryModel = require('./categoryModel');
exports.FriendModel = require('./friendModel');
exports.CommentModel = require('./commentModel');
exports.TagModel = require('./tagModel');
exports.SettingModel = require('./settingModel');
exports.PageModel = require('./pageModel');
exports.ResourceModel = require('./resourceModel');
//配置连接参数 断开重连
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  // reconnectTries: Number.MAX_VALUE, // 总是尝试重新连接
  // reconnectInterval: 500, // 每500ms重新连接一次
  poolSize: 10, // 维护最多10个socket连接
  bufferMaxEntries: 0, // 如果没有连接立即返回错误，而不是等待重新连接
  connectTimeoutMS: 10000, // 10s后放弃重新连接
  socketTimeoutMS: 45000, // 在45s不活跃后关闭sockets
};
// 1.1 连接数据库
const dbUrl = `mongodb://${
  dbInfo.username && dbInfo.password
    ? dbInfo.username + ':' + dbInfo.password + '@'
    : ''
}${dbInfo.localhost}:${dbInfo.dbport}/${dbInfo.data}`;
connect(dbUrl, options);
//1.2 获取连接对象
const conn = connection;
// 1.3 绑定连接完成的监听
conn
  .on('connected', () => {
    console.log('数据库连接成功！');
  })
  .on('error', () => {
    console.log('连接失败');
  })
  .on('disconnected', () => {
    console.log('断开连接');
  });
