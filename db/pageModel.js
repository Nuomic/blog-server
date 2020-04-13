const { Schema, model } = require('mongoose');
//定义描述文档结构
const pageSchema = Schema({
  pageName: { type: String, required: true },
  pv: { type: Number, default: 1 },
});
//定义Model
module.exports = model('page', pageSchema);
