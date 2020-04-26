const { Schema, model } = require('mongoose');

//定义描述文档结构
const commentSchema = Schema(
  {
    articleId: { type: Schema.Types.ObjectId, default: null },
    parentId: { type: Schema.Types.ObjectId, default: null },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    isMine: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    // dislikeCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
//定义Model
module.exports = model('comment', commentSchema);
