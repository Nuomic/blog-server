const { Schema, model } = require('mongoose');

//定义描述文档结构
const categorySchema = Schema(
  {
    id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    summary: String,
    avatar: {
      type: String,
      default:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
    }
  },
  { timestamps: true }
);
//定义Model
module.exports = model('category', categorySchema);
