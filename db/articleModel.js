const { Schema, model } = require('mongoose');

//定义描述文档结构
const articleSchema = Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      default: '5e3a26d58766592fac406e1f'
    },
    tagIds: { type: Array, default: [] },
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    // commentCount: { type: Number, default: 0 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true, default: '1' }
  },
  { timestamps: true }
);
//定义Model
module.exports = model('article', articleSchema);
