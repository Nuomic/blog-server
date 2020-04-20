const { Schema, model } = require('mongoose');

//定义描述文档结构
const portfolioSchema = Schema(
  {
    resoureUrl: { type: String, required: true },
    preUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    pictureUrl: { type: String, required: true },
  },
  { timestamps: true }
);
//定义Model
module.exports = model('portfolio', portfolioSchema);
