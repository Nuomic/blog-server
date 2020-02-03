const { connect, connection } = require('mongoose');

const userModel = require('./userModel');
const articleModel = require('./articleModel');
const categoryModel = require('./categoryModel');
const friendModel = require('./friendModel');
const commentModel = require('./commentModel');
const tagModel = require('./tagModel');
const settingModel = require('./settingModel');
const { dbUrl } = require('../config');
// 1.1 连接数据库
connect(dbUrl);
//1.2 获取连接对象
const conn = connection;
// 1.3 绑定连接完成的监听
conn.on('connected', () => {
  console.log('数据库连接成功！');
});

exports.UserModel = userModel;
exports.ArticleModel = articleModel;
exports.CategoryModel = categoryModel;
exports.FriendModel = friendModel;
exports.CommentModel = commentModel;
exports.TagModel = tagModel;
exports.SettingModel = settingModel;
