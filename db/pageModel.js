const { Schema, model } = require('mongoose');

const pageInfo = new Schema({
  pageName: { type: String, required: true },
  pv: { type: Number, default: 1 },
});

//定义描述文档结构
const pageSchema = new Schema({
  date: { type: String, required: true, unique: true },
  pageInfo: [pageInfo],
});
//定义Model
module.exports = model('page', pageSchema);
