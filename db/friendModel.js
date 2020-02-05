const { Schema, model } = require('mongoose');
//定义描述文档结构
const friendSchema = Schema({
  siteName: { type: String, required: true },
  nickname: { type: String, required: true },
  siteUrl: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 1 }
});
//定义Model
module.exports = model('friend', friendSchema);
