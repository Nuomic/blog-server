const { Schema, model } = require('mongoose');

//定义描述文档结构
const tagSchema = Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true }
});
//定义Model
module.exports = model('tag', tagSchema);
