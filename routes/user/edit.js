const { UserModel } = require('../../db');
const { resTemp, errTemp } = require('../config');
const filter = { password: 0, _v: 0 };
module.exports = (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const changePwd = (value) => {
    UserModel.findByIdAndUpdate(userId, value, (err, userInfo) => {
      console.log('userInfo', userInfo);
      if (err) return res.json(errTemp(err, '数据库错误'));
      if (userInfo) {
        res.json(resTemp({ msg: '修改成功' }));
      } else {
        res.json(errTemp(err, '修改密码失败，请稍后再试！'));
      }
    });
  };
  UserModel.findById(userId, (err, userInfo) => {
    if (err) return res.json(errTemp(err, '数据库错误'));
    if (userInfo) {
      const isPasswordValid = require('bcryptjs').compareSync(
        oldPassword,
        userInfo.password
      );
      if (newPassword) {
        if (isPasswordValid) changePwd({ password: newPassword });
        else res.json(errTemp(err, '原密码错误，修改失败'));
      } else res.json(errTemp(err, '请输入新密码'));
    } else {
      res.json(errTemp(err, '用户不存在'));
    }
  });
};
