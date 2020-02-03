const { Schema, model } = require('mongoose');

//定义描述文档结构
const settingSchema = Schema({
  about: {
    userDesc: { type: String, required: true },
    blogDesc: { type: String, required: true },
    weChat: { type: String, required: true },
    alipay: { type: String, required: true }
  }
});
//定义Model
module.exports = model('setting', settingSchema);
