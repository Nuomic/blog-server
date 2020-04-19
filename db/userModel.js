const { Schema, model } = require('mongoose');

//定义描述文档结构
const userSchema = Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      set(val) {
        return require('bcryptjs').hashSync(val, 10);
      },
    },
    email: { type: String /* , required: true */ },
    nickname: { type: String /* , required: true */ },
    phonenumber: { type: String },
    avatar: {
      type: String,
      default:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
  },
  { timestamps: true }
);
//定义Model
module.exports = model('user', userSchema);
