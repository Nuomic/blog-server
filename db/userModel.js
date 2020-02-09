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
      }
    },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    phone_number: { type: String }
  },
  { timestamps: true }
);
//定义Model
module.exports = model('user', userSchema);
