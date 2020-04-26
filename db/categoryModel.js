const { Schema, model } = require('mongoose');

//定义描述文档结构
const categorySchema = Schema(
  {
    name: { type: String, required: true, unique: true, default: '未分类草稿' },
    summary: String,
    avatar: {
      type: String,
      default:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
  },
  { timestamps: true }
);
//定义Model
module.exports = model('category', categorySchema);
