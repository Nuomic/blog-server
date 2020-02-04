const { Schema, model } = require('mongoose');
//定义描述文档结构
const friendSchema = Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true }
});
//定义Model
module.exports = model('friend', friendSchema);
